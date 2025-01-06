const asynchandler=require("express-async-handler");
const jwt=require("jsonwebtoken")

const validateToken =asynchandler(async(req,resizeBy, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
resizeBy.status(401);
throw new Error("user is not authorized")

            }
       req.user=decoded.user;
       next();
        })
        if(!token){
            res.status(401)
            throw new Error("token is invalid")
        }
     
    }
})
module.exports=validateToken;