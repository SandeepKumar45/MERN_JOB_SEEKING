import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import validator from "validator";
import { createRefreshToken } from "../utils/refreshToken.js";


export const register = asyncHandler(async (req, res) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
        return res.status(400)
        .json(new ApiResponse(400,null,"All fields are required"))
    }

    if (!validator.isEmail(email)) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Please provide a valid email!"))
    }

    const existedEmail = await User.findOne({ email })
    if (existedEmail) {
        return res.status(400)
        .json(new ApiResponse(400,null,"user with this email already exist"))
    }

    try {
        const user = await User.create({
            name,
            email,
            phone,
            password,
            role
        })
    
        const refreshToken = await createRefreshToken(user)
    
        const createdUser = await User.findById(user._id).select("-password")
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        return res.status(200)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, createdUser, "User Registered Successfully")
            )
    } catch (error) {
        return res.status(400)
        .json(new ApiResponse(400,null,error.message))
    }

})

export const login = asyncHandler(async (req, res) => {
    const { email, password, role } = req.body
    if (!email || !password || !role) {
        return res.status(400)
        .json(new ApiResponse(400,null,"All fields are required"))
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Invalid Credentials"))
    }

    const checkPassword = await user.isPasswordCorrect(password)

    if (!checkPassword) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Invalid Credentials"))
    }

    if (role !== user.role) {
        return res.status(400)
        .json(new ApiResponse(400,null,"Invalid Credentials"))
    }

    const refreshToken = await createRefreshToken(user)

    const loggedUser = await User.findById(user._id).select("-password")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedUser, "User Logged In!")
        )
})

export const logout = asyncHandler(async (req,res) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(200, {}, "User Logged Out")
    )
})

export const getuser = asyncHandler((req,res) => {
    const user = req.user
    res.status(200)
    .json(new ApiResponse(200,user))
})