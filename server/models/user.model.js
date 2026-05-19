// User model. Stores creator accounts and login provider details.
import mongoose , {Schema} from 'mongoose';

// Creator account schema.
const userSchema = new Schema({
        name: {
        type : String,
        required : true,
        trim : true,
        maxlength : 50
    },
    email: {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
    },
    passwordHash: {
        type : String,
        // Google users do not have a local password.
        required : function () {
            return this.authProvider === 'email';
        }
    },
    authProvider: {
        type : String,
        enum : ['email', 'google'],
        default : 'email'
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type : String,
        // Admin users bypass the free quiz limit.
        enum : ['creator', 'admin'],
        default : 'creator'
    },
    lastLoginAt: {
        type : Date
    }
},
    {timestamps : true}
)

export default mongoose.model('User', userSchema);
