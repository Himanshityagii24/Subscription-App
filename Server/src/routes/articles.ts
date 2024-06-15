import express, { Request, Response } from "express";
import { body, validationResult } from 'express-validator';
import User from "../models/user"; 
import Article from "../models/article";
import Stripe from "stripe";
import { stripe } from "../utils/stripe";
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

router.get("/", checkAuth, async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.user });

        if (!user || !user.customerStripeId) {
            return res.status(404).json({ error: 'User or Stripe customer ID not found' });
        }

        const subscriptions = await stripe.subscriptions.list(
            {
                customer: user.customerStripeId,
                status: "all",
                expand: ["data.default_payment_method"]
            }, {
                apiKey: process.env.STRIPE_SECRET_KEY
            }
        );
        if(!subscriptions.data.length) return res.json([]);
//@ts-ignore
const plan = subscriptions.data[0].pause_collection.nicknam;
     if(plan == "Basic"){
        const articles = await Article.find({access:"Basic"});
        return res.json(articles)
     }
     else if(plan == "Standard"){
        const articles = await Article.find({access:{$in :["Basic" ,"Standard"]}
        });
        return res.json(articles)
     }     else {
        const articles = await Article.find({});
        return res.json
     }
        res.json(plan);
    } catch (error) {
        console.error('Error fetching subscriptions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
