import express from "express";
const router = express.Router();

import {
    toggleLike,
    addComments,
    checkUserLike,
    getComments,
    getLikesCount
} from "../controllers/interractions.controller.js";

import authenticateToken from "../middlewares/auth.middleware.js";


router.post("/:blogId/like", authenticateToken, toggleLike);
router.get("/:blogId/likes/count", authenticateToken, getLikesCount); 
router.get("/:blogId/likes/check", authenticateToken, checkUserLike); 

router.post("/:blogId/comment", authenticateToken, addComments);
router.get("/:blogId/comments", getComments);

export default router;
