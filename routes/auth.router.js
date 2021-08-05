const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const bcryptSalt = bcrypt.genSaltSync(10);

const User = require('../models/user.model');
const Exercise = require('../models/exercise.model');
const Food = require('../models/food.model');
const Happy = require('../models/happy.model');

const jwt = require("jsonwebtoken");
const secret = process.env['jwt-secret'];

router.post('/signup',async function(req, res) {
  try{
    const { email, password, name } = req.body;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
      const newUser = await User.create({ name: name, email: email, password: hashedPassword });
      const excercise_create = await Exercise.create({ user: newUser._id });
      const food_create = await Food.create({ user: newUser._id });
      const happy_create = await Happy.create({ user: newUser._id });

      const token = jwt.sign({uid: newUser._id}, secret, {expiresIn: '24h'})
      res.status(201).json({
        success: true,
        token: token
      });
    } else {
      res.status(409).json({
        success: false,
        error: {
          message: "User Already Exists"
        }
      });
    }
  }catch(e){
      res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }  
});

router.post('/login', async function(req, res){
  const {email, password} = req.body;
  try{
  const user = await User.findOne({ email: email });
  
  if(user){
    const validPassword = bcrypt.compareSync(password, user.password);
    const token = jwt.sign({uid: user._id}, secret, {expiresIn: '24h'})
    if(validPassword){
      res.status(200).json({
        success: true,
        token: token
      })
    }
    else{
      res.status(401).json({
        success: false,
        error: {
          message: "Invalid password"
        }
      });
    }    
  }else{
    res.status(401).json({
        success: false,
        error: {
          message: "User not registered"
        }
    })
  }}catch(e){
      res.status(400).json({
        success: false,
        error: {
          message: e.message
        }
      });
  }  
});

module.exports = router;