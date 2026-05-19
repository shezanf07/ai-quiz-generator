// AI service. It sends cleaned source text to Gemini and stores the result.
import { GoogleGenerativeAI } from "@google/generative-ai";
import AiGeneration from '../models/AiGeneration.model.js';
import SourceDocument from '../models/SourceDocument.model.js';

export const generateQuizQuestions = async ({ userId, sourceDocumentId, questionCount = 10, difficulty = 'medium' }) => {
    // Make sure the source exists and belongs to this creator.
    const sourceDoc = await SourceDocument.findById(sourceDocumentId);
    if (!sourceDoc) {
        throw new Error('Source document not found');
    }

    if (sourceDoc.creatorId.toString() !== userId.toString()) {
        throw new Error("Unauthorized to access this document");
    }

    const textToAnalyze = sourceDoc.cleanedText || sourceDoc.extractedText;

    if (!textToAnalyze || textToAnalyze.length < 50) {
        throw new Error("Source document has insufficient text for generation");
    }

    // Initialize the Google Generative AI client.
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        generationConfig: {
            responseMimeType: 'application/json',
        }
    });


    const prompt = `
    You are an expert educational quiz creator. Based on the following source text, generate exactly ${questionCount} multiple-choice questions at a ${difficulty} difficulty level.
    
    The response MUST be a valid JSON array of objects. Do not include any markdown formatting like \`\`\`json or \`\`\`. Just return the raw JSON array.
    Each object in the array must strictly follow this structure:
    {
      "question": "The question text",
      "options": [
        { "id": "A", "text": "First option" },
        { "id": "B", "text": "Second option" },
        { "id": "C", "text": "Third option" },
        { "id": "D", "text": "Fourth option" }
      ],
      "correctOptionId": "A", // Must be A, B, C, or D
      "explanation": "Brief explanation of why the answer is correct",
      "difficulty": "${difficulty}" // Must be easy, medium, or hard
    }

    Source Text:
    ---
    ${textToAnalyze.substring(0, 30000)} // Limiting to ~30k characters to prevent massive payload issues
    ---
    `;
    // Save a pending generation before calling the AI provider.
    const aiGeneration = await AiGeneration.create({
        creatorId: userId,
        sourceDocumentId: sourceDoc._id,
        provider: 'gemini',
        model: 'gemini-2.5-flash',
        request: {
            questionCount,
            difficulty
        },
        status: 'pending'
    });

    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        let generatedQuestions;

        try {
            // Gemini is instructed to return raw JSON, so parse it directly.
            generatedQuestions = JSON.parse(responseText);
        } catch (parseError) {
            console.error("Raw Gemini output:", responseText);
            throw new Error("Failed to parse AI output into valid JSON");
        }

        if (!Array.isArray(generatedQuestions)) {
            throw new Error("AI did not return an array");
        }

        // Store successful output for history and debugging.
        aiGeneration.generatedQuestions = generatedQuestions;
        aiGeneration.status = 'completed';
        await aiGeneration.save();


        return {
            aiGenerationId: aiGeneration._id,
            questions: generatedQuestions
        };

    } catch (error) {
        // Keep failed AI output status in the database.
        aiGeneration.status = 'failed';
        aiGeneration.errorMessage = error.message;
        await aiGeneration.save();
        throw new Error(`AI Generation Failed: ${error.message}`);
    }


}
