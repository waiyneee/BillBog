import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


const Signup = () => {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate =useNavigate();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      const result = await axios.post("/api/user/signup", {
        fullName,
        email,
        password,
      });
      console.log("success in the  signup: saved", result.data);
      navigate("/signin")
    } catch (err) {
      // console.log(err)
      console.log("signup error", err.message || err.response?.data);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f7f3] px-4">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <input
          type="text"
          placeholder="fullName"
          value={fullName}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setfullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
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
