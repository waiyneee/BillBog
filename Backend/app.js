import dotenv from "dotenv"
dotenv.config();
import express from "express"
const app=express()

import cookieParser from "cookie-parser"
// import cors from "cors"

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true,
// })) no need proxy is ther --->mig1

import mongoose from "mongoose"

mongoose.connect((process.env.MONGO_DB_URL))
.then(()=>{
    console.log(`Mongo db connected`)
})
.catch((err)=>{
    console.log(`error :`, err)
})

import User from "./models/user.model.js"


//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

//routes
import userRoutes from "./routes/users.routes.js"
app.use("/api/user",userRoutes)


const PORT = process.env.PORT || 8000


app.get("/",(req,res)=>{
   
    res.send("servers home page ")
    
})


app.listen(PORT,(req,res)=>{
    console.log(`server started successfully at port : ${PORT}`)
})



