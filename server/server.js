import 'dotenv/config'; // Must be the very first import to load env variables
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

// Start server only after a successful database connection (Top-level await)
try {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Server failed to start due to database connection error.");
    process.exit(1);
}