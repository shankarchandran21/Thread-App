import User from "../models/userModels.js"
import bcrypt from "bcryptjs"
import getTokenAndSetCookies from "../utils/helper/getTokenAndSetCookies.js"


const getUserProfile = async(req,res)=>{
    
    const {userName } = req.params

    try {
        const user = await User.findOne({userName}).select("-password").select("-updatedAt")
        if(!user) return res.status(400).json({message:`user not found`})
            res.status(200).json(user)
    } catch (err) {
        
    }
}

const signupUser = async (req,res)=>{
    
    try {
        const {name,userName,email,password} = req.body
        const user = await User.findOne({$or:[{email},{userName}]})      
        if(user){
            return res.status(400).json({message:"User already exists"})
        }  
        const salt = await bcrypt.genSalt(10) // 10 make slower but more secure it's good
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name,
            userName,
            email,
            password:hashPassword
        })
        await newUser.save()
        if(newUser){
            getTokenAndSetCookies(newUser._id,res)
            res.status(201).json({
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                userName:newUser.userName,
            })

           
        }else{
            res.status(400).json({message:"Invalid user data"})
        }

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in signup user : ${err.message}` )
    }


}


const loginUser = async (req, res) => {

    try {
        const {userName,password} = req.body

        const user = await User.findOne({userName})
        const isPasswordCorrect = await bcrypt.compare(password,user?.password||"")

        if(!user || !isPasswordCorrect) return res.status(400).json({message:"Invalid userName and password"})

            getTokenAndSetCookies(user._id,res)
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                userName:user.userName
            })
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in signup user : ${err.message}` )
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt","",{maxAge:1})
        res.status(200).json({message:`Successfully logged out`})
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in logout user : ${err.message}` )
    }
}

const followUnFollowUser = async(req,res)=>{
    
    try {
        const {id} = req.params;
     
        const userToModify = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if(id === req.user._id.toString()) return res.status(400).json({message:"You can't follow and unFollow yourself"})
            
            if (!userToModify || !currentUser) return res.status(400).json({ error: "User not found" });
            const isFollowing = currentUser.following.includes(id)
            if(isFollowing){
                //unFollow the user
                // Modify the current user following arr and modify the followers of user followers arr to modify
                await User.findByIdAndUpdate(id,{$pull:{followers:req.user._id}}) // pull means remove
                await User.findByIdAndUpdate(req.user._id,{$pull:{following:id}}) // pull means remove
                res.status(200).json({message:"user unFollowed successfully"})
            }else{
                //Follow the user
                await User.findByIdAndUpdate(req.user._id,{$push:{following:id}}) // push means add
                await User.findByIdAndUpdate(id,{$push:{followers:req.user._id}}) // push means add
                res.status(200).json({message:"user followed successfully"})
                
            }

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in follow and UnFollowing users : ${err.message}` )
    }
}

const updateUser = async (req, res) => {
    const {name,email,userName,password,profilePic,bio} = req.body
    const userId = req.user._id
    try {
        let user = await User.findById(userId)

        if(!user) return res.status(400).json({message:"User not found"})

            if(req.params.id !== userId.toString()) return res.status(400).json({message:"you can not update other users profile"})

        if(password){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password,salt)
            user.password = hashPassword
        }
        user.name = name || user.name 
        user.userName = userName || user.userName
        user.email = email || user.email
        user.profilePic=profilePic || user.profilePic
        user.bio = bio || user.bio

        user =  await user.save()
        res.status(200).json({message:"Profile updated successfully",user})

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in update user : ${err.message}` )
    }

}

export{signupUser,loginUser,logoutUser,followUnFollowUser,updateUser,getUserProfile}