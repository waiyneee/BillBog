import User from "../models/user.model.js";
import bcrypt from "bcrypt"

import { createToken } from "../services/authentication.js";


async function signupUser(req, res) {
  try {
    const { fullName, password, email } = req.body;
    console.log(req.body);


    await User.create({
      fullName,
      password,   // plain password → will get hashed by pre-save hook
      email
    });



    return res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
}



async function signinUser(req,res){
  try {
    const {email,password} = req.body;

    const activeuser= await User.findOne({email});
    if(!activeuser) {
      return res.status(400).json({msg:"login activeuser doesn't exists"});

    }

    const matchPassword= await bcrypt.compare(password,activeuser.password);
    if(!matchPassword){
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const token=createToken({id:activeuser._id,email:activeuser.email})

     res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
    });

    return res.status(200).json({
      msg:"login successfull",
     
      user:{id:activeuser._id,email:activeuser.email}

    })
    

  

  } catch (error) {
    console.log(error);

    res.status(403).json({msg:"login error occurred "});
    
  }
}

async function signoutUser(req,res){
  res.clearCookie("token",{
    https:true,
    secure:process.env.NODE_ENV=="production",
    sameSite:"strict"
  })

  return res.status(202).json({msg:"logged out successfully"})

}

export { signupUser,signinUser,signoutUser}
