
import React,{ useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"

const Signin = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] =useState("")
  const navigate= useNavigate();

  const handleSubmit= async(ev)=>{
    ev.preventDefault();
    try {
      const result=await axios.post("/api/user/signin",{
        email,
        password
      },{withCredentials:true})
      console.log("login successful:--->",result.data)

      navigate("/")
      
    } catch (error) {
      console.log(error)
      
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f9f7f3] px-4">
      <h1 className="text-3xl md:text-4xl font-serif mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <input
          value={email}
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
