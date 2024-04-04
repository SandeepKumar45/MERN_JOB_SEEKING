import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name!"],
            minLength: [3, "Name must contain at least 3 characters!"],
            maxLength: [30, "Name cannot exceed 30 characters!"]
        },
        email: {
            type: String,
            required: [true, "Please enter your Email!"],
        },
        phone: {
            type: Number,
            required: [true, "Please enter your Phone Number!"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password!"],
            minLength: [8, "Password must contain at least 8 characters!"],
            maxLength: [32, "Password cannot exceed 32 characters!"],
        },
        role: {
            type: String,
            required: [true, "Please select a role"],
            enum: ["Job Seeker", "Employer"]
        },
    }, { timestamps: true }
)


//ENCRYPTING THE PASSWORD WHEN THE USER REGISTERS OR MODIFIES HIS PASSWORD
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
})

//COMPARING THE USER PASSWORD ENTERED BY USER WITH THE USER SAVED PASSWORD
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password);
}

//GENERATING REFRESH TOKEN WHEN A USER REGISTERS OR LOGINS, IT DEPENDS ON OUR CODE THAT WHEN DO WE NEED TO GENERATE THE JWT TOKEN WHEN THE USER LOGIN OR REGISTER OR FOR BOTH.
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} 


export const User = mongoose.model("User",userSchema);
