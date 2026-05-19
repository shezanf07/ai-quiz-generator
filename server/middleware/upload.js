// Multer upload setup for PDF, DOCX and TXT files.
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req , file , cb) => {
    // Keep uploads limited to document types we can extract text from.
    const allowedMimeTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'text/plain'
    ];

    if (allowedMimeTypes.includes(file.mimetype)){
        cb(null , true);
    }
    else{
        cb(new Error("Invalid file type. Only PDF, DOCX, and TXT are allowed."), false);
    }
};

export const upload = multer({
    storage,
    fileFilter,
    // Files stay in memory because we only need the text, not permanent storage.
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
});
