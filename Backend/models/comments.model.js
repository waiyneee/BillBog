import mongoose ,{Schema} from "mongoose"

const commentSchema = mongoose.Schema({
    blogId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"blog",
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user", // Corrected: ensure this references your User model
    },
    text:{
        type:String,
        required:true,
        trim:true,
    },
},{timestamps:true})

const Comment= mongoose.model("Comment",commentSchema)

export default Comment;
