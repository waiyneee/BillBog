import Blog from "../models/blogs.model.js"

async function createBlog(req,res){
    const { title, content} = req.body;
    if (!title || !content) {
      return res.status(400).json({ msg: "Title and content are required" });
    }
    const uploadImageFile = req.files?.uploadImage ? req.files.uploadImage[0] : null;
    const upload2ImageFile = req.files?.upload2Image ? req.files.upload2Image[0] : null;

   try {
     const uploadImagePath = uploadImageFile ? uploadImageFile.path : null;
     const upload2ImagePath = upload2ImageFile ? upload2ImageFile.path : null;

     const blog= await Blog.create({
        title:req.body.title,
        content:req.body.content,
        uploadImage:uploadImagePath,
        upload2Image:upload2ImagePath,
        createdBy:req.user._id, 

    })

     return res.status(201).json({ msg: "Blog created successfully", blogId: blog._id });

   } catch (err) {
    console.error("Error creating blog:", err);
    return res.status(500).json({msg:"Error in blog creation", error: err.message });
   }
}

async function getAllBlogs(req,res){
    try{
    
        const blogs=await Blog.find({})
                                .populate('createdBy', 'fullName email') 
                                .sort({createdAt:-1});
        return res.status(200).json({blogs:blogs});
    }catch(err){
        console.error("Error in fetching all blogs:", err); 
        return res.status(500).json({msg:`Error in fetching all blogs`}); 
    }
}

async function getSingleBlog(req, res) {
    try {
        const { id } = req.params;
        
        const blog = await Blog.findById(id).populate('createdBy', 'fullName email'); // Populate createdBy

        if (!blog) {
            return res.status(404).json({ msg: "Blog not found" });
        }

        return res.status(200).json({ blog });
    } catch (error) {
        console.error("Error fetching single blog:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ msg: "Invalid blog ID format" });
        }
        return res.status(500).json({ msg: "Error fetching blog", error: error.message });
    }
}

export {createBlog,getAllBlogs,getSingleBlog}
