// Database connection helper for MongoDB.
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Mongoose keeps the connection alive for the whole app.
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        throw error;
    }
    
};
export default connectDB;
