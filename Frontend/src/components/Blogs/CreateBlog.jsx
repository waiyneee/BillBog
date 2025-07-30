import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression'; 

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [uploadImage, setUploadImage] = useState(null);
  const [upload2Image, setUpload2Image] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Helper function to compress image
  const compressImage = async (file) => {
    if (!file) return null;

    const options = {
      maxSizeMB: 1, // (max file size in MB) - target 1MB to stay well under Cloudinary's 10MB limit
      maxWidthOrHeight: 1920, // max width or height in pixels
      useWebWorker: true, 
      fileType: file.type 
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(`Original file size: ${file.size / 1024 / 1024} MB`);
      console.log(`Compressed file size: ${compressedFile.size / 1024 / 1024} MB`);
      return compressedFile;
    } catch (error) {
      console.error("Image compression error:", error);
      setError("Failed to compress image. Please try a smaller file.");
      return null;
    }
  };


  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      
      const compressedUploadImage = await compressImage(uploadImage);
      const compressedUpload2Image = await compressImage(upload2Image);

      if ((uploadImage && !compressedUploadImage) || (upload2Image && !compressedUpload2Image)) {
        
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (compressedUploadImage) formData.append("uploadImage", compressedUploadImage);
      if (compressedUpload2Image) formData.append("upload2Image", compressedUpload2Image);

      const res = await axios.post("/api/blog/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Blog created:", res.data);
      setTitle("");
      setContent("");
      setUploadImage(null);
      setUpload2Image(null);
      setSuccessMessage("Blog created successfully!");
      setTimeout(() => setSuccessMessage(""), 5000);
      navigate("/all-blogs");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f7f3] flex justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 w-full max-w-3xl space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 font-inter mb-4">
          Create a New Blog
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          rows="8"
          required
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUploadImage(e.target.files[0])}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setUpload2Image(e.target.files[0])}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {error && <p className="text-red-600 font-medium">{error}</p>}
        {successMessage && <p className="text-green-600 font-medium">{successMessage}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl transition duration-200"
        >
          {loading ? "Creating..." : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
