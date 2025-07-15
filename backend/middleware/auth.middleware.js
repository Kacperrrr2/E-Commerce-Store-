import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({ message: "Access token not found" })
        }
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");
            if (!user) {
                return  res.status(401).json({ message: "User not found" })
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401).json({ message: "Access token expired" })
            }
            throw error;

        }
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
         return res.status(401).json({ message: "Access token not valid" })
    }


}

export const adminRoute = async (req, res, next) => {
    if (req.user.role === "admin" && req.user) {
        next()
    }
    else {
        return res.status(401).json({ message: "You are not authorized to access this route" })
    }
}
