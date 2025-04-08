import multer from 'multer';
import path from 'path';

// Configure storage - store files in memory temporarily
const storage = multer.memoryStorage();

// File filter to accept only text files
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    // Accept only text files
    if (file.mimetype === 'text/plain' || path.extname(file.originalname).toLowerCase() === '.txt') {
        cb(null, true);
    } else {
        cb(new Error('Only text files are allowed'));
    }
};

// Export the configured multer instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5MB
    }
});

export default upload; 