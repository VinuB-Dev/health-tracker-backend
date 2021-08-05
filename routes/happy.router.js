const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Happy = require('../models/happy.model');

router.get('/',async function(req, res) {
  const happyData = await Happy.find({user:req.uid})
    res.status(200).json({
        success: true,
        happyData: happyData
      });
});

router.post('/post',async function(req, res) {
  req.body.note["_id"] = new mongoose.Types.ObjectId();
  Happy.findOneAndUpdate(
    { user: req.uid }, 
    { $push: { data: req.body.note } },
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log(success);
    }
  })
    res.status(200).json({
        success: true
      });
});

module.exports = router;