const asynchandler =require("express-async-handler");
const bcrypt= require("bcrypt");
const User = require("../models/userModel")
const jwt=require("jsonwebtoken")
//@desc reg a user
//@route POST /api/users/register
//@acess public
const registerUser=asynchandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory!")
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already register!")   
    }

//hash password
const hashedPassword =await bcrypt.hash(password,10);
console.log("hash password:",hashedPassword)
const user =await User.create({
    username,email,password: hashedPassword,
});
console.log(`user created${user}`)
if(user){
    res.status(201).json({_id: user.id,email:user.email});
}else{
    res.status(400);
    throw new Error("user data not valid")
}
    res.json({message:"register the user"})
});
//@desc login a user
//@route POST /api/users/login
//@acess public
const loginUser=asynchandler(async (req,res)=>{
    const {email,password} =req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("all field are mandatory")
    }
    const user =await User.findOne({email});
    //compare password  with hashed one
    if(user && await bcrypt.compare(password,user.password)){
        const accessToken= jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken})
    }else{
        res.status(401)
        throw new Error("email or password is not valid");
    }
   
} );
//@desccurrent user
//@route POST /api/users/current
//@acessprivate
const currentUser=asynchandler(async (req,res)=>{
    res.json(req.user)
} );
module.exports={registerUser,loginUser,currentUser}