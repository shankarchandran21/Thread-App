import express from 'express';
import dotenv from "dotenv"
import connectDB from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"
import postRoutes from "./routes/PostRoutes.js"

dotenv.config()
const app = express();
const PORT = process.env.PORT || 3000

//Middlewares
app.use(express.json()) // It Allows to parse JSON data in the body
app.use(express.urlencoded({ extended: true })) //To Parse form data in the body
app.use(cookieParser())

//Routes
app.use("/api/users",userRoutes)
app.use("/api/posts",postRoutes)


app.listen(PORT,connectDB());
