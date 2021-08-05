const express = require('express');
const router = express.Router();

const UserDetails = require('../models/user_details.model');

router.post('/',async function(req, res) {
  const {age,height,weight,gender } = req.body;

  const userDetails = await UserDetails.create({ user: req.uid,
  age:age,weight:weight,height:height,gender:gender });

    res.status(200).json({
        success: true
      });
});

router.post('/update',async function(req, res) {
  const {age,height,weight } = req.body;
  const userDetails = await UserDetails.findOneAndUpdate(
  { user: req.uid},
  {$set: {age:age,weight:weight,height:height }},
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  });

    res.status(200).json({
        success: true
      });
});

router.get('/',async function(req, res) {
  const userDetails = await UserDetails.find({user:req.uid})
    res.status(200).json({
        success: true,
        data: userDetails
      });
});

module.exports = router;