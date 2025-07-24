import User from "../models/user.model.js";
import bcrypt from "bcrypt"

import { createToken } from "../services/authentication.js";


async function signupUser(req, res) {
  try {
    const { fullName, password, email } = req.body;
    

    await User.create({
      fullName,
      password,   // plain password 
      email
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    // Check for duplicate key error
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    return res.status(500).json({ message: "Something went wrong during signup" });
  }
}


async function signinUser(req,res){
  try {
    const {email,password} = req.body;

    const activeuser= await User.findOne({email});
    if(!activeuser) {
      return res.status(400).json({msg:"Invalid email or password"}); 
    }

    const matchPassword= await bcrypt.compare(password,activeuser.password);
    if(!matchPassword){
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    
    const token=createToken({
      id:activeuser._id,
      email:activeuser.email,
      fullName:activeuser.fullName 
    })

     res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 d
    });

    return res.status(200).json({
      msg:"Login successful",
      user:{
        id:activeuser._id,
        email:activeuser.email,
        fullName:activeuser.fullName 
      }
    })

  } catch (error) {
    console.log("Signin error:", error); 
    res.status(500).json({msg:"Login error occurred"}); 
  }
}

async function signoutUser(req,res){
  res.clearCookie("token",{
    httpOnly:true, 
    secure:process.env.NODE_ENV==="production",
    sameSite:"strict"
  })

  return res.status(200).json({msg:"Logged out successfully"}) 

}

function getAuthStatus(req, res) {
    if (req.user) {
        return res.status(200).json({
            isAuthenticated: true,
            user: {
                _id: req.user.id, 
                email: req.user.email,
                fullName: req.user.fullName 
            }
        });
    } else {
        
        return res.status(200).json({ isAuthenticated: false });
    }
}

export { signupUser, signinUser, signoutUser, getAuthStatus } 
