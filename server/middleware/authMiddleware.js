import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../models/userModel.js";

const requireSignIn = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "JWT must be provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user information to the request
        req.user = await UserModel.findById(decoded._id);

        if (!req.user || req.user.role !== 0) {
            return res.status(401).json({ message: "Unauthorised User" });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

const isAdmin = asyncHandler(async (req, res, next) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({ message: "JWT must be provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);

        // Attach user information to the request
        req.user = await UserModel.findById(decoded._id);
        // console.log(req.user);
        if (!req.user || req.user.role !== 1) {
            return res
                .status(403)
                .json({ message: "Access denied. Admin privileges required." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

export { requireSignIn, isAdmin };
