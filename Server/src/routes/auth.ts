import express, { Request, Response } from "express"; // Import Request and Response types
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.post('/signup',
    [
        body("email").isEmail().withMessage("The email is invalid"),
        body("password").isLength({ min: 5 }).withMessage("The password is invalid")
    ],
    async (req: Request, res: Response) => { // Specify types for req and res
        const validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            const errors = validationErrors.array().map((error) => {
                return {
                    msg: error.msg,
                };
            });

            return res.json({ errors, data: null });
        }

        const { email, password } = req.body;

        res.json({
            email,
            password
        });
    }
);

export default router;
