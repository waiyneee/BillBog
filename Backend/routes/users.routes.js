import express from "express"
const router = express.Router()

import {signinUser, signoutUser, signupUser, getAuthStatus} from "../controllers/user.controller.js"; // getAuthStatus is now imported

import authenticateToken from "../middlewares/auth.middleware.js" // authenticateToken is imported

router.post("/signup",signupUser)
router.post("/signin",signinUser)
router.post("/signout",signoutUser)

router.get("/auth-status", authenticateToken, getAuthStatus); // This route is present

export default router;
