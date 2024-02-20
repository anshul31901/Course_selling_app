// Middleware for handling auth
const jwt = require('jsonwebtoken')
const {JWT_SECRET}= require("../config")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
 
    const token = req.headers.authorization;
    //token would look like Bearer Token
    const words = token.split(" ");
    const jwt_token = words[1];

   try{ const decoded = jwt.verify(jwt_token,JWT_SECRET);
//in contrary to checking username and password again in database it is a better approach as 
//it resolves auth locally as at server level we can verify and not use search againand again
    if(decoded.username){
        req.username = decoded.username;
        // console.log(req.username);
        next();
    }
    else{
        res.status(403).json("you are not authenticated")
    }
  }catch(e){
    res.json({msg:"invalid credentials"});
  }

}

module.exports = userMiddleware;