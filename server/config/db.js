import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async ()=>{
        try {
          
            const res = await mongoose.connect(ENV_VARS.MONGO_URL)
            console.log(`MongoDB connected ${res.connection.host}`)
        } catch (err) {

            console.log(`Error connecting to MongoDB ${err.message}`)
            process.exit(1) // 1 means there was an error 0 means successfully connected
        }
}