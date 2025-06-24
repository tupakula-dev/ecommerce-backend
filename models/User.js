const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    validate:{
      validator:function(value){
        return validator.isStrongPassword(value,{
          minLength:8,
          minLowercase:1,
          minUppercase:1,
          minNumbers:1,
          minSymbols:1

        },
      );
      }
    }
  },
  createdAt:{
    type:Date,
    default:Date.now
  }


}, { timestamps: true });
userSchema.methods.getJWT=async function(){
  const user=this;
  const token=await jwt.sign({_id:user._id},"raajasaab@8",{expiresIn:"7d"});

  return token;
}
userSchema.methods.Validatepass=async function(passwordbyuser){
  const user=this;
  const passwordHash=user.password;
   const ispasswordValid=await bcrypt.compare(passwordbyuser,passwordHash);
    return ispasswordValid;
   }



module.exports = mongoose.model("User", userSchema);
