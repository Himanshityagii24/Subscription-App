import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/user"; // Use correct case for User
import Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.get("/prices", async (req, res) => {
  try {
    const prices = await stripe.prices.list({
      apiKey: process.env.STRIPE_SECRET_KEY,
    });
    return res.json(prices);
  } catch (error) {
    console.error("Error fetching prices:", error);
    return res.status(500).json({ error: "Failed to fetch prices" });
  }
});

router.post("/session", checkAuth, async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.user });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new session with the user's customer ID
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{
        price: req.body.priceId,
        quantity: 1
      }],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/article-plans",
      customer: user.customerStripeId
    }, {
      apiKey: process.env.STRIPE_SECRET_KEY,
    });

    return res.json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
