import mongoose ,{Schema} from "mongoose"

const likeSchema= mongoose.Schema({
    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog",
        required:true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true, 
    }
},{timestamps:true})

const Like = mongoose.model("Like",likeSchema)

export default Like;
