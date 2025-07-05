import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export function createToken(payload){
    return jwt.sign(payload,process.env.JWT_TOKEN_SECRET,{
        expiresIn:process.env.JWT_EXPIRY
    })
}

export function validateToken(token){
    return jwt.verify(token,process.env.JWT_TOKEN_SECRET)
}