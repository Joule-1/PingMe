import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        fullname: {
            type: String,
            required: [true, "Full Name is required."],
            minlength: [3, "Full name must be at least 3 characters long"],
            maxlength: [100, "Full name cannot exceed 100 characters"],
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            minlength: [6, "Email must be at least 6 characters long"],
            maxlength: [254, "Email cannot exceed 254 characters"],
            trim: true,
            index: true,
            lowercase: true,
            validate: [validator.isEmail, "Invalid Email Format"],
            set: (value) => validator.normalizeEmail(value),
        },
        userImage: {
            type: String,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: [validator.isStrongPassword, "Invalid Password"],
        },
        googleSignUp: {
            type: Boolean,
            required: [true, "SignUp method is required"]
        },
        refreshToken: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

const User = mongoose.model("User", userSchema);

export default User;
