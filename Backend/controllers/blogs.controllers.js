import Blog from "../models/blogs.model.js"

async function createBlog(req,res){

    const { title, content, uploadImage, avatarImage } = req.body;
    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }
   try {
     const blog= await Blog.create({
        title:req.body.title,
        content:req.body.content,
        uploadImage:req.body.uploadImage,
        avatarImage:req.body.avatarImage,
        createdBy:req.user._id,
        
    })

    


    return res.status(201).json({msg:"blog created successfully"})
    
   } catch (error) {
    //  console.log(error)
    return res.status(401).json({msg:"error in blog creation"})
   
    
   }
}

export {createBlog}