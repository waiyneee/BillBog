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


const Blog = mongoose.model("blog",blogSchema)

export default Blog;
