const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Food = require('../models/food.model');

router.get('/',async function(req, res) {
  const foodData = await Food.find({user:req.uid})
    res.status(200).json({
        success: true,
        foodData: foodData
      });
});

router.post('/list',async function(req, res) {
  req.body.newData["_id"] = new mongoose.Types.ObjectId();
  console.log(req.body.newData)
  Food.findOneAndUpdate(
    { user: req.uid }, 
    { $push: { data: req.body.newData } },
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  }
);
    res.status(200).json({
        success: true
      });
});

router.post('/updateList',async function(req, res) {
  const {listid, breakfast, lunch, dinner, calories} = req.body
  console.log(listid, breakfast, lunch, dinner, calories)
  Food.findOneAndUpdate(
    { 'data._id': listid }, 
    { $set: { 'data.$.breakfast': breakfast,
     'data.$.lunch': lunch,
     'data.$.dinner': dinner,
     'data.$.calories': calories} },
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  }
);
    res.status(200).json({
        success: true
      });
});

router.post('/removeList',async function(req, res) {
  const {listid} = req.body
  Food.findOneAndUpdate(
    { user: req.uid }, 
    { $pull: { "data": { '_id': listid }}},
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  }
);
    res.status(200).json({
        success: true
      });
});

router.post('/addCalories',async function(req, res) {
  req.body.newData["_id"] = new mongoose.Types.ObjectId();
  Food.findOneAndUpdate(
    { user: req.uid }, 
     { $push: { calories : req.body.newData } },
  function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log();
    }
  }
);
    res.status(200).json({
        success: true
      });
});

module.exports = router;