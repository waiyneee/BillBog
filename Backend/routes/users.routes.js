import express from "express"
const router = express.Router()

import {signinUser, signoutUser, signupUser} from "../controllers/user.controller.js";

router.post("/signup",signupUser)
router.post("/signin",signinUser)
router.post("/signout",signoutUser)












export default router;