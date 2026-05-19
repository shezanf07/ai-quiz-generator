// Main Express app setup. Middleware and API routes are connected here.
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import quizRoutes from './routes/quizRoutes.js';
import attemptRoutes from './routes/attemptRoutes.js';

const app = express();

// Keep CORS strict, but allow local dev and the deployed client URL.
const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            console.warn(`Blocked by CORS: origin ${origin} is not in allowedOrigins`);
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));


app.use(express.json());

// API route groups.
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/attempts', attemptRoutes);

app.get('/', (req, res) => {
    // Small health check for browser or Postman testing.
    res.json({ message: "Server is running Successfully" });
});

export default app;
