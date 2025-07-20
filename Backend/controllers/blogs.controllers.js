import Blog from "../models/blogs.model.js"

async function createBlog(req,res){

    const { title, content} = req.body;
    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }

    
    const uploadImageFile = req.files?.uploadImage ? req.files.uploadImage[0] : null;
    const avatarImageFile = req.files?.avatarImage ? req.files.avatarImage[0] : null; 

   try {
     const uploadImagePath = uploadImageFile ? uploadImageFile.path : null;
     const avatarImagePath = avatarImageFile ? avatarImageFile.path : null;

     const blog= await Blog.create({
        title:req.body.title,
        content:req.body.content,
        uploadImage:uploadImagePath,
        avatarImage:avatarImagePath,
        createdBy:req.user._id, 

    })

     return res.status(201).json({ msg: "Blog created successfully", blogId: blog._id });

   } catch (err) {
  
    console.error("Error creating blog:", err);
    return res.status(500).json({msg:"Error in blog creation", error: err.message });
   }
}

async function getAllBlogs(){

    
    try{
        const blogs=await Blog.find({}).sort({createdAt:-1})
        return res.status(200).json({blogs:blogs})
   

    }catch(err){
        console.log(err)
        return res.staus(500).json({msg:`error in fetching all blogs`})

    }
}
export {createBlog,getAllBlogs}