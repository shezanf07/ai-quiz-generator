// Document service. It extracts text from files and saves source documents.
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import SourceDocument from '../models/SourceDocument.model.js';

export const extractTextFromFile = async (file) => {
    try {
        // Pick the parser based on MIME type from multer.
        if (file.mimetype === 'application/pdf') {
            const parser = new PDFParse({ data: file.buffer });
            const data = await parser.getText();
            return data.text;
        }
        else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            return result.value;
        }
        else if (file.mimetype === 'text/plain') {
            return file.buffer.toString('utf-8');
        }
        throw new Error('Unsupported file type');
    } catch (error) {
        throw new Error(`Failed to extract text: ${error.message}`);
    }
}

export const processAndSaveDocument = async (userId, file, pastedText) => {
    let extractedText = "";
    let sourceType = "text";
    let originalName = "";
    let mimeType = "";
    let sizeBytes = 0;
    let extension = "";

    if (file) {
        // File upload path.
        sourceType = "file";
        originalName = file.originalname;
        mimeType = file.mimetype;
        sizeBytes = file.size;

        if (mimeType === 'application/pdf') extension = 'pdf';
        if (mimeType.includes('wordprocessingml')) extension = 'docx';
        if (mimeType === 'text/plain') extension = 'txt';

        extractedText = await extractTextFromFile(file);

    }
    else if (pastedText) {
        // Plain text path.
        sourceType = "text";
        extractedText = pastedText;
        sizeBytes = Buffer.byteLength(pastedText, 'utf-8');
    }
    else {
        throw new Error("No file or text provided");
    }

    // Normalize whitespace so the AI gets cleaner input.
    const cleanedText = extractedText.replace(/\s+/g, ' ').trim();
    const wordCount = cleanedText.split(' ').filter(word => word.length > 0).length;

    if (wordCount < 10) {
        throw new Error("Document is too short to generate a meaningful quiz.");
    }

    // Save only document metadata and extracted text.
    const sourceDoc = await SourceDocument.create({
        creatorId: userId,
        sourceType,
        originalName,
        mimeType,
        extension,
        sizeBytes,
        storageProvider: "none",
        extractedText,
        cleanedText,
        wordCount,
        characterCount: cleanedText.length,
        status: "ready",
        parsedAt: new Date()
    });

    return sourceDoc;
};
