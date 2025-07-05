import mongoose from "mongoose"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
      fullName:{
        type:String,
        required:true,

      },
      email:{
        type:String,
        required:true,
        unique:true,

        
      },
      password:{
        type:String,
        required:true,
      },
      role:{
        type:String,
        enum:["ADMIN","USER"],
        default:"USER",
      }
},{timestamps:true})

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
 try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User =mongoose.model("user",userSchema)

export default User;