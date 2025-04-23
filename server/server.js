import express from 'express';
import authRouter from "./routes/auth.route.js"
import searchRoutes from "./routes/search.route.js"
import { ENV_VARS } from './config/envVars.js';
import { connectDB } from './config/db.js';
import movieRouter from "./routes/movie.route.js"
import cookieParser from "cookie-parser"
import { protectRoute } from './middleware/productRoute.js';
const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json()) // it's allows you parse body json
app.use(cookieParser()) // it's allows to use cookies for jwt token
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/movie",protectRoute,movieRouter)
app.use("/api/v1/search", protectRoute, searchRoutes);
app.get("", (req, res) => {
    res.send("Server is running")
})

app.listen(PORT,()=>{
    console.log(`Server started at http://localhost:${PORT}`)
    connectDB()
})


