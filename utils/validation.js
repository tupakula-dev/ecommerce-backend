const validator=require("validator");
const bcrypt=require("bcrypt");
const validateSignupdate=(req)=>{
    const{name,email,password}=req.body;
    if(!name){
        throw new Error("name is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("pls enter the strong password");
    }
    else if(!validator.isEmail(email)){
        throw new Error("pls enter the valid email");

    }
}
module.exports={validateSignupdate};

