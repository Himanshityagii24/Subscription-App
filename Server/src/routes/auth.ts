import express, { Request, Response } from "express"; // Import Request and Response types
import { body, validationResult } from 'express-validator';
import User from "../models/user"; // Use correct case for User
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import user from "../models/user";
const router = express.Router();
import { stripe } from "../utils/stripe";
import { checkAuth } from '../middleware/checkAuth';


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

        try {
            // Check if a user with the same email already exists
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.json({
                    errors: [
                        {
                            msg: "Email already in use ",
                        },
                    ],
                    data: null
                });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
              //creating stripe customer
              const customer = await stripe.customers.create(
                {
                  email,
                },
                {
                  apiKey: process.env.STRIPE_SECRET_KEY,
                }
              )
            // Create a new user with hashed password
            const newUser = await User.create({
                email,
                password: hashedPassword,
                customerStripeId:customer.id
            });

            const token = await JWT.sign(
                { email: newUser.email },
                process.env.JWT_SECRET as string,
                { expiresIn: 3600 } // Expires in 1 hour (3600 seconds)
            );

            res.json({
                errors: [],
                data: {
                    token,
                    user: {
                        id: newUser._id,
                        email: newUser.email,
                        stripeCustomerId: customer.id,
                    }
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.json({
        errors: [
          {
            msg: "Invalids credentials",
          },
        ],
        data: null,
      });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return res.json({
        errors: [
          {
            msg: "Invalids credentials",
          },
        ],
        data: null,
      });
    }
  
    const token = await JWT.sign(
      { email: user.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );
  
    return res.json({
      errors: [],
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  });
  
  router.get("/me", checkAuth, async (req, res) => {
    try {
        // If req.user is the user's email directly, use it in the query
        const user = await User.findOne({ email: req.user });

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                errors: [{
                    msg: "User not found",
                }],
                data: null,
            });
        }

        return res.json({
            errors: [],
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                   CustomerStripeId: user.customerStripeId
                },
            },
        });
    } catch (error) {
        console.error("Error finding user:", error);
        return res.status(500).json({
            errors: [{
                msg: "Internal server error",
            }],
            data: null,
        });
    }
});


  
export default router;
