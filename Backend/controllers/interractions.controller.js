import Blog from "../models/blogs.model.js"
import Like from "../models/likes.models.js" 
import Comment from "../models/comments.model.js" 


async function toggleLike(req,res){
    const {blogId}= req.params
    const userId = req.user.id 

    if(!userId){
        return res.status(401).json({msg:"Authentication required to like a blog"})
    }
    try{
        const blogExists =await Blog.findById(blogId)
        if (!blogExists) {
            return res.status(404).json({ msg: "Blog not found" });
        }
        const existingLike = await Like.findOne({ blogId, userId });
        if (existingLike) {
            //unlike
            await Like.deleteOne({ _id: existingLike._id });
            return res.status(200).json({ msg: "Blog unliked successfully", liked: false }); 
        } else {
            //like
            await Like.create({ blogId, userId });
            return res.status(201).json({ msg: "Blog liked successfully", liked: true }); 
        }

    }catch(err){
        console.error("Error toggling like:", err); 
        return res.status(500).json({msg:"Error in like and unlike", error: err.message}); 
    }

}

async function checkUserLike(req, res) {
    const { blogId } = req.params;
    const userId = req.user.id; 

    if (!userId) {
        return res.status(200).json({ liked: false });
    }

    try {
        const liked = await Like.exists({ blogId, userId });
        return res.status(200).json({ liked: !!liked });
    } catch (error) {
        console.error("Error checking user like status:", error);
        return res.status(500).json({ msg: "Error checking like status", error: error.message });
    }
}

async function getLikesCount(req, res) {
    const { blogId } = req.params;
    try {
        const count = await Like.countDocuments({ blogId });
        return res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching likes count:", error);
        return res.status(500).json({ msg: "Error fetching likes count", error: error.message });
    }
}

async function addComments(req,res){
    const {blogId} =req.params
    const userId = req.user.id 
    const {text}=req.body

     if (!userId) {
        return res.status(401).json({ msg: "Authentication required to add any comment" });
    }
    if (!text || text.trim() === "") {
        return res.status(400).json({ msg: "Comment text cannot be empty" });
    }
    try {
        const blogExists = await Blog.findById(blogId);
        if (!blogExists) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        const comment = await Comment.create({ blogId, userId, text });

        
        await comment.populate('userId', 'fullName email');
        return res.status(201).json({ msg: "Comment added successfully", comment });
    } catch (error) {
        console.error("Error adding a comment:", error);
        return res.status(500).json({ msg: "Error adding a comment", error: error.message });
    }
}

async function getComments(req, res) {
    const { blogId } = req.params;
    try {
        
        const comments = await Comment.find({ blogId })
                                      .populate('userId', 'fullName email')
                                      .sort({ createdAt: 1 });

        return res.status(200).json({ comments });
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ msg: "Error fetching comments", error: error.message });
    }
}

export {
    toggleLike,
    getLikesCount,
    checkUserLike,
    addComments,
    getComments,
};
