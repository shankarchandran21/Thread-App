import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs"
import { genterateTokenAndSetCookies } from "../utils/genterateToken.js";
export const signUp = async(req,res)=>{
   try {
  
        const {userName,email,password} =req.body;
           
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !password || !userName){
           return res.status(400).json({success: false, message:"please enter all the required information"})
        }else if (!emailRegex.test(email)){
            return res.status(400).json({success: false, message:"Invalid email"})
        }else if(password.length < 6){
            return res.status(400).json({success: false,message:"Please enter at least 7 characters"})
        }else{
            const existingUserByEmail = await User.findOne({email:email})
            const existingUserByUserName = await User.findOne({userName : userName}) 
            if(existingUserByUserName && existingUserByEmail){
                return res.status(400).json({success: false,message:"userName and email already exists"})
            }else if(existingUserByEmail){
                return res.status(400).json({success: false,message:"email already exists"})
            }else if(existingUserByUserName){
                return res.status(400).json({success: false,message:"userName already exists"})
            }else{
   
                const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"]

                const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

                
                // https://www.geeksforgeeks.org/password-encryption-in-node-js-using-bcryptjs-module/
                const salt = await bcryptjs.genSalt(10)
                const hashPassword = await bcryptjs.hash(password,salt)
                
                console.log(hashPassword)
                const newUser = new User({
                    userName,
                    email,
                    password:hashPassword,
                    image
                })
                if(newUser){
                    genterateTokenAndSetCookies(newUser._id,res)
                    await newUser.save()
                    res.status(200).json({success:true,message:`User saved successfully`,users:{
                        ...newUser._doc,password:""
                    }})
                }
                
            }

        }   

   } catch (err) {   
        res.status(500).send({success: false,message:"Internal server error"})
   }
}

export const login= async(req,res)=>{
    const {email,password} = req.body
        try {
            if(!email || !password){
                res.status(400).json({message:"All fields are required"})
            }else{
                const user = await User.findOne({email})
                if(!user){
                    return res.status(400).json({message:"Invalid email"})
                }else{
                    const isPasswordCorrect = await bcryptjs.compare(password, user.password)
                  
                    if(!isPasswordCorrect){
                        return res.status(400).json({message:"Invalid password"})
                    }else{
                        genterateTokenAndSetCookies(user._id,res)
                        res.status(200).json({success:true,user:{...user._doc,password:""}})
                    }
                }
            }
        } catch (err) {
            res.status(500).send({success: false,message:"Internal server error"})
        }
   
}

export const logout= async(req,res)=>{
    try {
        res.clearCookie("jwt-netflix")
        res.status(200).json({success:"true",message:"logout successful"})
    } catch (err) {
        res.status(500).send({success: false,message:"Internal server error"})
    }
}
