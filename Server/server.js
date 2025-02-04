import express from 'express';
import multer from 'multer';
import dotenv from "dotenv";
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import cors from 'cors';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Multer Storage (No Limit)
const storage = multer.memoryStorage();
const upload = multer({ storage }); 

// Cloudinary Config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware with Increased Limits
app.use(upload.any());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Server
app.listen(PORT, connectDB);
