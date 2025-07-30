import dotenv from "dotenv"
dotenv.config();
import express from "express"
const app=express()
import {v2 as cloudinary} from "cloudinary"

import cookieParser from "cookie-parser"

import mongoose from "mongoose"

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


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


// REMOVED: Static files are no longer served locally from /public
// app.use("/public",express.static("public"))

//routes
import userRoutes from "./routes/users.routes.js"
import blogRoutes from "./routes/blogs.routes.js"
import interractionRoutes from "./routes/interractions.routes.js"


app.use("/api/user",userRoutes)
app.use("/api/blog",blogRoutes)
app.use("/api/interactions", interractionRoutes);

const PORT = process.env.PORT || 8000


app.get("/",(req,res)=>{
    res.send("servers home page ")
})



app.listen(PORT,(req,res)=>{
    console.log(`server started successfully at port : ${PORT}`)
})
