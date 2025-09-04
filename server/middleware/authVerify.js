import asyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/index.js";
import { AppError } from "../utils/ApiErrors.js";

const protect = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Access denied. Bearer token not provided.', 401);
    }
    const tokenFromHeader = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(tokenFromHeader, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            throw new AppError('Your account does not exist.', 401);
        }

        if (user.profile_complete !== 'COMPLETE') {
            throw new AppError('Your account is not active. Please contact the help section!', 401);
        } 

        req.user = user;
        next();

    } catch (error) {
        const statusCode = error instanceof AppError ? error.statusCode : 500;
        console.error('JWT or User Validation Error:', error);
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Session expired. Please log in again.', 401));
        } else if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token. Please log in again.', 401));
        } else {
            return next(new AppError('Unauthorized! Something went wrong with token validation.', 401));
        }
    }
});