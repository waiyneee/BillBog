import mongoose, { Schema } from "mongoose";

const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    content:{
        type:String,
        required:true,

    },
    uploadImage:{
        type:String,
        
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user",
    },
    avatarImage:{
        type:String,
        
    }
},{timestamps:true})

async function getAllBlogs(){

    
    try{
        const blogs=await blogSchema.find({}).sort({createdAt:-1})
        return res.status(200).json({blogs:blogs})
   

    }catch(err){
        console.log(err)
        return res.staus(500).json({msg:`error in fetching all blogs`})

    }
}


const Blog = mongoose.model("blog",blogSchema)

export default Blog;
