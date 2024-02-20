const express = require("express");
const {User,Course} = require('../db');
const { JWT_SECRET } = require("../config");
const router = express.Router();
const jwt = require('jsonwebtoken');

const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username:username,
        password:password
    })
    res.send("new user has been created!")
});
router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({username:username,password:password});

    if(user){
        const token = await jwt.sign({username},JWT_SECRET);

        res.json({token});

    }
    else{
        res.status(411).json({
            msg:"invalid username or password"
        })
    }





});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const response = await Course.find({});
    res.json({
        course: response
    } )
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    //Note: courseID i want to purchase is passed through query parameter

    const courseId = req.params.courseId;
    const username = req.username; 
    await User.updateOne({username : username},
        {
            $push:{purchasedCourses : courseId}
        })

    res.json({msg: "purchase complete"});

});
router.get("/try",userMiddleware,(req,res)=>{
    console.log("verified");
})

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;

    const response  = await User.findOne({username:username})
    const purchasedCourses = await Course.find({
        _id : {
            "$in" : response.purchasedCourses
        }
    });
    res.json({
        purchasedCourses: purchasedCourses
    });

});

module.exports = router


