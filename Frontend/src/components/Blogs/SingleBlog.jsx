import React ,{useState,useEffect} from "react"
import axios from "axios"
import {useParams,Link} from "react-router-dom"


const SingleBlog= ()=>{
    const {id}= useParams();

    const [blog,setBlog] =useState(null);
    const [loading,setLoading] =useState(null);
    const [error,setError] =useState(null)

    useEffect(() => {
        const fetchBlog =async ()=>{
            try {
                const res = await axios.get(`/api/blog/${id}`)
                setBlog(res.data.blog)
                
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.msg || "Failed to Load Blogs...") 
            }finally{
                setLoading(false)
            }
        };
         if (id) { 
      fetchBlog();
        }
  }, [id]); 

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex justify-center items-center">
        <p className="text-gray-700 text-lg">Loading blog...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex flex-col justify-center items-center">
        <p className="text-red-600 text-lg mb-4">{error}</p>
        <Link to="/" className="text-green-600 hover:underline">
          Go back to all blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex flex-col justify-center items-center">
        <p className="text-gray-700 text-lg mb-4">Blog not found.</p>
        <Link to="/" className="text-green-600 hover:underline">
          Go back to all blogs
        </Link>
      </div>
    );
  }
      

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Title at top */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-inter text-center mb-6">
          {blog.title}
        </h1>

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blog.uploadImage && (
            <img
              src={`http://localhost:8080/${blog.uploadImage.replace('./', '')}`}
              alt="Blog main"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          )}
          {blog.upload2Image && (
            <img
              src={`http://localhost:8080/${blog.upload2Image.replace('./', '')}`}
              alt="Blog avatar"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          )}
        </div>

        {/* Content after images */}
        <div className="prose max-w-none text-gray-700 leading-relaxed text-lg">
          <p>{blog.content}</p>
        
        </div>

        {/* Back button */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-xl transition duration-200"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
