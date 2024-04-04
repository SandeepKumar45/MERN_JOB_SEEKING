import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    const { refreshToken } = req.cookies
    
    if (!refreshToken) {
        return res.status(401)
        .json(new ApiResponse(401,null,"Unauthorized request"))
    }

    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const user = await User.findById(decodedToken.id)

    if (!user) {
        return res.status(401)
        .json(new ApiResponse(401,null,"Invalid Token"))
    }

    req.user = user
    next()
})