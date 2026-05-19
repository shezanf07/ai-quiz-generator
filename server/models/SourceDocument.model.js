// Source document model. Stores uploaded or pasted study material.
import mongoose, { Schema } from "mongoose";

// Stores extracted text before it is sent to AI.
const sourceDocumentSchema = new Schema({
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sourceType: {
        type: String,
        enum: ["file", "text"],
        required: true
    },
    originalName: {
        type: String,
        default: "",
        trim: true
    },
    mimeType: {
        type: String,
        match: [/^[\w.-]+\/[\w.+-]+$/, "Invalid MIME type"],
        default: ""
    },
    extension: {
        type: String,
        enum: ["pdf", "docx", "txt", ""],
        default: ""
    },
    sizeBytes: {
        type: Number,
        default: 0
    },
    storageProvider: {
        type: String,
        // Current app keeps files in memory and saves text only.
        enum: ["local", "s3", "cloudinary", "none"],
        default: "none"
    },
    storageKey: {
        type: String,
        default: ""
    },
    fileUrl: {
        type: String,
        default: ""
    },
    extractedText: {
        type: String,
        default: ""
    },
    cleanedText: {
        type: String,
        default: ""
    },
    wordCount: {
        type: Number,
        default: 0
    },
    characterCount: {
        type: Number,
        default: 0
    },
    checksum: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        enum: ["uploaded", "parsing", "ready", "failed"],
        default: "uploaded"
    },
    parseError: {
        type: String,
        default: ""
    },
    parsedAt: {
        type: Date
    }
},
    {timestamps: true}
);


// Common lookup indexes for owner, status and possible duplicate checks.
sourceDocumentSchema.index({ creatorId: 1, createdAt: -1 });
sourceDocumentSchema.index({ checksum: 1 });
sourceDocumentSchema.index({ status: 1 });

export default mongoose.model('SourceDocument', sourceDocumentSchema);
