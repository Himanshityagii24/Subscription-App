import express from 'express';
import authRoutes from './routes/auth';
import mongoose from "mongoose";
import dotenv from "dotenv";
const app = express();

dotenv.config();

mongoose.connect(
    process.env.MONGO_URI  as string 
)
.then(() =>{
    console.log("connected to mongodb")
    app.listen(8080, () => {
        console.log('listening to port 8080');
    });
})
.catch(() => {
    throw new Error()
})
// Middleware to parse JSON bodies of incoming requests
app.use(express.json());

app.get("/", (req,res) => {
    res.send("hello");
});

// Use the authRoutes middleware for paths starting with "/auth"
app.use("/auth", authRoutes);


