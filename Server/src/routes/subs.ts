import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/user"; // Use correct case for User
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import user from "../models/user";
import Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { checkAuth } from '../middleware/checkAuth';
const router = express.Router();

router.get("/prices", checkAuth, async (req, res) => {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });
  
    return res.json(prices);
  });

export default router;
