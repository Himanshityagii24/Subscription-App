import express from 'express';
import authRoutes from './routes/auth';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import subsRoutes from "./routes/subs";

const app = express();

dotenv.config();

// Middleware to parse JSON bodies of incoming requests and enable CORS
app.use(express.json());
app.use(cors());

// Use the authRoutes middleware for paths starting with "/auth"
app.use("/auth", authRoutes);
app.use("/subs", subsRoutes);

// Define a default route
app.get("/", (req, res) => {
    res.send("hello");
});

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("connected to MongoDB");
        app.listen(8080, () => {
            console.log('listening on port 8080');
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
