import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../state/authSlice";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const result = await axios.post(
        "/api/user/signup",
        { fullName, email, password },
        { withCredentials: true }
      );

      console.log("Signup successful:", result.data);

      
     

      navigate("/signin");
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f7f3] px-4">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          type="text"
          value={fullName}
          placeholder="Name"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
