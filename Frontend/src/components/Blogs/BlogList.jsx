import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await axios.get("/api/blog/all");
        setBlogs(result.data.blogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.response?.data?.msg || "Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex justify-center items-center">
        <p className="text-gray-700 text-lg">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex justify-center items-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-10 px-4">
      <div className="max-w-6xl mx-auto"> {/* Wider max-width for cards */}
        <h1 className="text-3xl font-bold text-gray-800 font-inter mb-8 text-center">Recent Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Grid for cards */}
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                {/* Display Image */}
                {blog.uploadImage && (
                  <img
                    src={`http://localhost:8080/${blog.uploadImage.replace('./', '')}`}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  {/* Blog Title */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
                    {blog.title}
                  </h2>
                  {/* Content Snippet */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  {/* Created By (optional, based on my backend population) */}
                  {blog.createdBy && (
                    <p className="text-gray-500 text-xs mb-4">
                      By: <span className="font-semibold">{blog.createdBy.fullName || blog.createdBy.email || 'Anonymous'}</span>
                    </p>
                  )}

                  {/* Read More Button */}
                  <Link
                    to={`/blogs/${blog._id}`} // Link to the single blog page
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl text-center block transition duration-200"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">No blogs found yet. Be the first to post!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
