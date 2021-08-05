const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Exercise = require('../models/exercise.model');

router.get('/',async function(req, res) {
  const exerciseData = await Exercise.find({user:req.uid})

    res.status(200).json({
        success: true,
        exerciseData: exerciseData
      });
});

router.post('/list',async function(req, res) {
  req.body.newData["_id"] = new mongoose.Types.ObjectId();
  console.log(req.body.newData)
  Exercise.findOneAndUpdate(
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
  const {listid, exercises, calories} = req.body
  Exercise.findOneAndUpdate(
    { 'data._id': listid }, 
    { $set: { 'data.$.exercises':exercises,
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
  Exercise.findOneAndUpdate(
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
  Exercise.findOneAndUpdate(
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