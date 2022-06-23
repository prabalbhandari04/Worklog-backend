import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
            unique: true,
        },
        address: {
            type: String,
            required: false,
        },
        contactNumber: {
            type: String,
            required: false,
            unique: true,
        },
        position: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },

        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;
