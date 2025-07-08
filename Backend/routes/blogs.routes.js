import express from "express"
const router=express.Router()

import { createBlog } from "../controllers/blogs.controllers.js"


router.post("/add",createBlog)


export default router 
