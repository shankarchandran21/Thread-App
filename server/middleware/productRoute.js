import cookieParser from "cookie-parser"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { ENV_VARS } from "../config/envVars.js"

export const protectRoute = async(req,res,next)=>{
    try {
            const token = req.cookies["jwt-netflix"]
            if(!token){
                return res.status(401).json({success:false,message:"unauthorized person"})
            }
            const decoded = jwt.verify(token,ENV_VARS.JWT_SECRET)
            console.log(decoded)
            console.log("NEXTTTTTTTTTTTTTTTTTTTTTTT")
            if(!decoded){
                return res.status(401).json({success:false,message:"Unauthorized - Invalid Token"})
            }
            const user = await User.findById(decoded.userId).select("-password")
            
            req.user = user;
            if(!user){
                return res.status(404).json({success: false, message:"User not found"})
            }
            next()
    } catch (err) {
        console.log(`Error in the middleware: ${err.message}`)
        res.status(500).send({success: false,message:"Internal server error"})
    }
}