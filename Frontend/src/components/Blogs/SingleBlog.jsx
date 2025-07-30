import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectIsLoggedIn, selectUserId } from '../../state/authSlice';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redux state for authentication
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUserId = useSelector(selectUserId);

  // State for Likes
  const [likesCount, setLikesCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);

  // State for Comments
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentError, setCommentError] = useState("");


  const fetchInteractionData = async () => {
    if (!id) return;

    try {
      const likesRes = await axios.get(`/api/interactions/${id}/likes/count`, { withCredentials: true });
      setLikesCount(likesRes.data.count);

      if (isLoggedIn) {
        const userLikeRes = await axios.get(`/api/interactions/${id}/likes/check`, { withCredentials: true });
        setUserLiked(userLikeRes.data.liked);
      } else {
        setUserLiked(false);
      }

      const commentsRes = await axios.get(`/api/interactions/${id}/comments`);
      setComments(commentsRes.data.comments);

    } catch (err) {
      console.error(`Error fetching interaction data for blog ${id}:`, err);
    }
  };


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching single blog:", err);
        setError(err.response?.data?.msg || "Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
      fetchInteractionData();
    }
  }, [id, isLoggedIn]);


  const handleToggleLike = async () => {
    if (!isLoggedIn) {
      alert("Please sign in to like this blog.");
      return;
    }
    try {
      const res = await axios.post(`/api/interactions/${id}/like`, {}, { withCredentials: true });
      setUserLiked(res.data.liked);
      fetchInteractionData();
    } catch (err) {
      console.error("Error toggling like:", err);
      alert(err.response?.data?.msg || "Failed to toggle like.");
    }
  };


  const handleAddComment = async (e) => {
    e.preventDefault();
    setCommentError("");
    if (!isLoggedIn) {
      alert("Please sign in to comment on this blog.");
      return;
    }
    if (newCommentText.trim() === "") {
      setCommentError("Comment text cannot be empty.");
      return;
    }

    try {
      const res = await axios.post(`/api/interactions/${id}/comment`, { text: newCommentText }, { withCredentials: true });
      setNewCommentText("");
      fetchInteractionData();
    } catch (err) {
      console.error("Error adding comment:", err);
      setCommentError(err.response?.data?.msg || "Failed to add comment.");
    }
  };


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
        <Link to="/all-blogs" className="text-green-600 hover:underline">
          Go back to all blogs
        </Link>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#f9f7f3] flex flex-col justify-center items-center">
        <p className="text-gray-700 text-lg mb-4">Blog not found.</p>
        <Link to="/all-blogs" className="text-green-600 hover:underline">
          Go back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f3] py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-serif text-center mb-6 leading-tight">
          {blog.title}
        </h1>

        {blog.createdBy && (
          <p className="text-gray-600 text-sm mb-4 text-center">
            By: <span className="font-semibold">{blog.createdBy.fullName || blog.createdBy.email || 'Anonymous'}</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blog.uploadImage && (
            <img
              src={blog.uploadImage} 
              alt="Blog main"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          )}
          {blog.upload2Image && (
            <img
              src={blog.upload2Image} 
              alt="Blog secondary"
              className="w-full h-64 object-cover rounded-xl shadow-md"
            />
          )}
        </div>

        <div className="prose max-w-none text-gray-700 font-sans leading-relaxed text-lg mt-6">
          <p>{blog.content}</p>
        </div>

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
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comments</h2>

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


        <div className="text-center mt-8">
          <Link
            to="/all-blogs"
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
