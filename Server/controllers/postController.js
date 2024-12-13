import User from "../models/userModels.js";
import Post from "../models/postModal.js";
const createPost = async (req,res)=>{

    try {
        const {postedBy,text,img}= req.body
        if (!postedBy || !text) {
			return res.status(400).json({ error: "PostedBy and text fields are required" });
		}

        const user = await User.findById(postedBy)
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
        

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}
        const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}
        const newPost = new Post({ postedBy, text, img });
		await newPost.save();
        res.status(201).json({message:"Post created successfully",newPost});

    } catch (err) {
        res.status(500).json({message: err.message})
        console.log(`Error in Create post : ${err.message}` )
    }


}


const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};


const deletePost= async (req, res) => {
    const {id} =req.params
    try {
        
            const post = await Post.findById(id)
            if(!post) res.status(404).json({message:"Post not found"})
            if(post.postedBy.toString() !== req.user.id.toString()) res.status(401).json({message:"Unauthorized to delete post"})
            
                await Post.findByIdAndDelete(id);
                res.status(200).json({message:"Post deleted successfully"})

        } catch (err) {
            res.status(500).json({ error: err.message });
    }
}

const likeUnlikePost = async (req, res) => {
    
    try {
        const {id:postId} = req.params
        const userId = req.user._id
        const post = await Post.findById(postId)
    

        if(!post) return res.status(404).json({message:"Post not found"})
        
           
            const userLikedPost = post.likes.includes(userId)
            if(userLikedPost){
                // unLike post
                await Post.updateOne({_id:postId},{$pull:{likes:userId}})
                res.status(200).json({message:";Post unLiked successfully"})
            }else{
                // like post
                post.likes.push(userId)
                await post.save()
                res.status(200).json({message:";Post liked successfully"})
            }
    } catch (err) {
        
    }
}

const replyToPost = async (req, res) => {
    try {
        const {text} = req.body
        const postId= req.params.id
        const {_id:userId,userProfilePic,userName} =  req.user

        if(!text) return res.status(400).json({message:"Text field is required"})

            const post = await Post.findById(postId)
            if(!post) return res.status(404).json({message:"Post not found"})
            
            const reply ={
                userId,
                text,
                userProfilePic,
                userName
            }
            post.replies.push(reply)
            await post.save()

            res.status(200).json({message:"Reply added successfully",post})

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getFeedPosts= async (req, res) => {

    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({message:"User not found"})
        const following = user.following

        //postedBy have id who create poste using that filtering following array post and sorting according to the createdAt 
        const feedPost = await Post.find({postedBy:{$in:following}}).sort({createdAt:-1})

        res.status(200).json({feedPost})


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export {createPost,getPost,deletePost,likeUnlikePost,replyToPost,getFeedPosts}