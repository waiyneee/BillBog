import express from "express"
const router=express.Router()
import multer from "multer"
import  authenticateToken  from "../middlewares/auth.middleware.js"


const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,`./public/temp`)
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}--->${file.originalname}`)
    }
})
const upload =multer({
    storage:storage
})



import { createBlog } from "../controllers/blogs.controllers.js"



router.post
("/add",
    authenticateToken,
    upload.fields([
        {name:`uploadImage`,maxCount:1},
        {name:`avatarImage`,maxCount:1}
    ]),
createBlog
);

router.get("/all",getallBlogs)


export default router 
