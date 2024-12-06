import jwt from "jsonwebtoken"
import User from "../models/userModels.js"

const protectRoute = async(req,res,next) => {
    try {
        const token = req.cookies.jwt // toke token from cookies
        if(!token) return res.status(401).json({message:"Unauthorized"}) // if token is not

        const decoded = jwt.verify(token,process.env.JWT_SECRET) // token decoded

        const user = await User.findById(decoded.userId).select("-password")// checking user in DB using _id
        
        req.user = user // save user in req.user

        next()

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in signup user : ${err.message}` )
    }
}

export default protectRoute