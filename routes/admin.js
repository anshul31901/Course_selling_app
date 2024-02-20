const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const {User,Admin,Course}= require("../db/index");
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;


    await User.create({username:username, password:password});
    res.send("new user has been created");



    
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

router.post('/courses', adminMiddleware,async  (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;
// await returns the an object that contains course id and other course info
    const newCourse =  await Course.create({
        title: title, description : description , price:price,imageLink:imageLink
    })
//_id is important parameter
    console.log(newCourse);
    res.json({
        msg: "course has been created successfully",
        courseId : newCourse._id
    })




});

router.get('/courses',adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    console.log(response);

    res.json({
        courses:response
    })
});

module.exports = router;