// JWT protection middleware for creator-only API routes.
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const protect = async (req, res, next) => {
    let token;
    // Protected routes expect a Bearer token from the frontend.
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            // Decode the token and attach the logged-in user to the request.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-passwordHash');

            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
}
