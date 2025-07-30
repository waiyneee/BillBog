import dotenv from "dotenv"
dotenv.config();
import express from "express"
const app=express()
import {v2 as cloudinary} from "cloudinary"
import rateLimit from 'express-rate-limit';
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import fs from 'fs/promises';

mongoose.connect((process.env.MONGO_DB_URL))
.then(()=>{
    console.log(`Mongo db connected`)
})
.catch((err)=>{
    console.log(`error :`, err)
})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

import User from "./models/user.model.js"


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const createTempDirectory = async () => {
  const tempDir = './public/temp';
  try {
    await fs.mkdir(tempDir, { recursive: true });
    console.log(`Ensured directory exists: ${tempDir}`);
  } catch (error) {
    console.error(`Error ensuring directory ${tempDir} exists:`, error);
  }
};
createTempDirectory();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login/signup attempts from this IP, please try again after 15 minutes.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);

app.use('/api/user/signin', authLimiter);
app.use('/api/user/signup', authLimiter);

import userRoutes from "./routes/users.routes.js"
import blogRoutes from "./routes/blogs.routes.js"
import interractionRoutes from "./routes/interractions.routes.js"


app.use("/api/user",userRoutes)
app.use("/api/blog",blogRoutes)
app.use("/api/interactions", interractionRoutes);

const PORT = process.env.PORT || 8080


app.get("/",(req,res)=>{
    res.send("servers home page ")
})



app.listen(PORT,(req,res)=>{
    console.log(`server started successfully at port : ${PORT}`)
})
