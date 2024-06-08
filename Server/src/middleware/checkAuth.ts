import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({
            errors: [{
                msg: "Unauthorized: No token provided",
            }],
        });
    }

    console.log("Received token:", token);
    const authToken = token.split(" ")[1];
    console.log("Extracted token:", authToken);

    try {
        const user = await JWT.verify(
            authToken,
            process.env.JWT_SECRET as string
         ) as {email :string};
        console.log("Verified user:", user);
        // If verification is successful, you may attach the user object to the request
        req.user = user.email;
        // Call next() to pass control to the next middleware function
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({
            errors: [{
                msg: "Unauthorized: Invalid token",
            }],
        });
    }
};
