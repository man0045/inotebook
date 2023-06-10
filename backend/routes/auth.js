const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Mannuforreason";
var fetchuser = require('../middleware/fetchuser');

router.post('/createuser',[
    body('name','Enter valid the Name').isLength({ min: 3 }),
    body('email','Enter the valid Email').isEmail(),
    body('password','Enter the valid password').isLength({ min: 5 }),

], async (req, res) => {
  let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
    let user = await User.findOne({email:req.body.email});
    if(user){
      return res.status(400).json({success, error: "sorry a user with this email already exist "})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data={
      user:{
        id:user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
      res.json({success, authtoken})
  }catch (error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
})
router.post('/login',[
  body('email','Enter valid Email').isEmail(),
  body('password','Password cannot be blank').exists(),
], async(req, res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password}=req.body;
    try {
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error:"Please try to login with correct credential"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"please try to login with correct credentials"})
      }
      const data={
        user:{
          id:user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken})
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }

});
router.post('/getuser',fetchuser, async(req, res)=>{
try {
  userId=req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
})

module.exports = router