// Server start file. It connects MongoDB first, then starts Express.
import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 5000;

try {
    // Start only after the database is ready.
    await connectDB();
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
} catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
}
