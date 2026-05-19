// Auth service. It creates users, checks passwords and creates JWT tokens.
import User from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
    // Token only needs the user id because we fetch the user on protected routes.
    return jwt.sign({ id }, process.env.JWT_SECRET || 'mysecretkey123', {
        expiresIn:
            process.env.JWT_EXPIRES_IN || '1d'
    });
}
export const registerUser = async ({ name, email, password }) => {
    // Do not allow duplicate accounts with the same email.
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    // Store only the hash, never the plain password.
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        passwordHash,
        authProvider: 'email'
    });

    if (!user) {
        throw new Error('Failed to create user');
    };

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });

    // Only email accounts use password login.
    if (user && user.authProvider === 'email' && await bcrypt.compare(password, user.passwordHash)) {
        user.lastLoginAt = new Date();
        await user.save();

        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        };   
    }
    else {
        throw new Error('Invalid email or password');
    }
};

export const loginWithGoogle = async (idToken) => {
    // Ask Google to verify the id token before trusting user data.
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    
    if (!response.ok) {
        throw new Error("Invalid Google ID Token");
    }

    const payload = await response.json();
    const { sub: googleId, email, name } = payload;

    if (!email) {
        throw new Error("Google account email is missing");
    }

    // Check if user already exists.
    let user = await User.findOne({ 
        $or: [
            { googleId: googleId },
            { email: email.toLowerCase() }
        ]
    });

    if (user) {
        // Link googleId if they signed up via email earlier.
        if (!user.googleId) {
            user.googleId = googleId;
        }
        if (user.authProvider !== 'google') {
            user.authProvider = 'google';
        }
        user.lastLoginAt = new Date();
        await user.save();
    } else {
        // Create new user for Google Sign-In.
        user = await User.create({
            name: name || "Google User",
            email: email.toLowerCase(),
            authProvider: 'google',
            googleId: googleId
        });
    }

    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
    };
};

