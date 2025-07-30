import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserId } from '../../state/authSlice';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUserId = useSelector(selectUserId);

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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 font-inter mb-10 text-center">Recent Blogs</h1>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8 last:mb-0"
            >
              {/* Blog Images */}
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                {blog.uploadImage && (
                  <img
                    src={blog.uploadImage} // Directly use the Cloudinary URL
                    alt={blog.title}
                    className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md"
                  />
                )}
                {blog.upload2Image && (
                  <img
                    src={blog.upload2Image} // Directly use the Cloudinary URL
                    alt="Blog secondary image"
                    className="w-full md:w-1/2 h-64 object-cover rounded-xl shadow-md"
                  />
                )}
              </div>

              {/* Blog Title */}
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 font-inter mb-4 leading-tight">
                {blog.title}
              </h2>

              {/* Created By */}
              {blog.createdBy && (
                <p className="text-gray-600 text-sm mb-4">
                  By: <span className="font-semibold">{blog.createdBy.fullName || blog.createdBy.email || 'Anonymous'}</span>
                </p>
              )}

              {/* Content Snippet */}
              <p className="text-gray-700 font-serif text-lg leading-relaxed mb-6 line-clamp-4">
                {blog.content}
              </p>

              {/* Read More Button */}
              <Link
                to={`/blogs/${blog._id}`}
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
              >
                Read More
              </Link>

              {/* Interactions (Likes & Comments) - Local state for each blog item */}
              <BlogInteractions blogId={blog._id} isLoggedIn={isLoggedIn} currentUserId={currentUserId} />
            </div>
          ))
        ) : (
          <p className="text-gray-700 text-center col-span-full">No blogs found yet. Be the first to post!</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;


// --- Helper Component for Blog Interactions (remains the same) ---
const BlogInteractions = ({ blogId, isLoggedIn, currentUserId }) => {
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentError, setCommentError] = useState("");

  const fetchInteractionData = async () => {
    if (!blogId) return;
    try {
      const likesRes = await axios.get(`/api/interactions/${blogId}/likes/count`, { withCredentials: true });
      setLikesCount(likesRes.data.count);
      if (isLoggedIn) {
        const userLikeRes = await axios.get(`/api/interactions/${blogId}/likes/check`, { withCredentials: true });
        setUserLiked(userLikeRes.data.liked);
      } else {
        setUserLiked(false);
      }
      const commentsRes = await axios.get(`/api/interactions/${blogId}/comments`);
      setComments(commentsRes.data.comments);
    } catch (err) {
      console.error(`Error fetching interaction data for blog ${blogId}:`, err);
    }
  };

  useEffect(() => {
    fetchInteractionData();
  }, [blogId, isLoggedIn]);

  const handleToggleLike = async () => {
    if (!isLoggedIn) { alert("Please sign in to like this blog."); return; }
    try {
      const res = await axios.post(`/api/interactions/${blogId}/like`, {}, { withCredentials: true });
      setUserLiked(res.data.liked);
      fetchInteractionData();
    } catch (err) { console.error("Error toggling like:", err); alert(err.response?.data?.msg || "Failed to toggle like."); }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentError("");
    if (!isLoggedIn) { alert("Please sign in to comment on this blog."); return; }
    if (newCommentText.trim() === "") { setCommentError("Comment text cannot be empty."); return; }
    try {
      const res = await axios.post(`/api/interactions/${blogId}/comment`, { text: newCommentText }, { withCredentials: true });
      setNewCommentText("");
      fetchInteractionData();
    } catch (err) { console.error("Error adding comment:", err); setCommentError(err.response?.data?.msg || "Failed to add comment."); }
  };

  return (
    <>
      <div className="flex items-center space-x-4 mt-6 border-t border-gray-200 pt-4">
        <button
          onClick={handleToggleLike}
          className={`flex items-center space-x-1 p-2 rounded-full transition duration-200 ${
            userLiked ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:text-red-500 hover:bg-gray-100'
          }`}
          title={userLiked ? "Unlike" : "Like"}
        >
          <span className="text-2xl">❤️</span>
          <span className="text-lg font-semibold">{likesCount}</span>
        </button>
        <span className="text-gray-600">Likes</span>
        <div className="flex items-center space-x-1 ml-4 text-gray-600">
          <span className="text-2xl">💬</span>
          <span className="text-lg font-semibold">{comments.length}</span>
          <span>Comments</span>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments</h3>
        <form onSubmit={handleAddComment} className="mb-6">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder={isLoggedIn ? "Write your comment here..." : "Sign in to comment..."}
            rows="3"
            disabled={!isLoggedIn}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 resize-y"
          ></textarea>
          {commentError && <p className="text-red-600 text-sm mt-1">{commentError}</p>}
          <button
            type="submit"
            disabled={!isLoggedIn || newCommentText.trim() === ""}
            className="mt-3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </form>
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-800 text-base">{comment.text}</p>
                <p className="text-gray-500 text-xs mt-2">
                  By: <span className="font-semibold">{comment.userId?.fullName || comment.userId?.email || 'Anonymous'}</span> on {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No comments yet. Be the first to comment!</p>
        )}
      </div>
    </>
  );
};
