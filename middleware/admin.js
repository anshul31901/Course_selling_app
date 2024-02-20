// Middleware for handling auth
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require("../config")
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    //token would look like Bearer Token
    const token_split = token.split(" ");
    const jwt_token = token_split[1];

  
//in contrary to checking username and password again in database it is a better approach as 
//it resolves auth locally as at server level we can verify and not use search againand again


    try{
        const decoded = jwt.verify(jwt_token,JWT_SECRET);
        if(decoded.username){
            next();
        }
        else{
            res.status(403).json("you are not authenticated")
        }

    }catch(e){
        res.status(411).json({msg:"you are not authenticated"});
    }

}

module.exports = adminMiddleware;


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFuc2h1bDEiLCJpYXQiOjE3MDg0MzYzNjJ9.BIuyzKo7tbnTBk9v4zmJ83QjIC8nk5cuh7v06hdqqXU
