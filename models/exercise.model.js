const mongoose = require("mongoose");

const {Schema} = mongoose;

const ExerciseDataSchema = new Schema({
    exercises: {type:[String]},
    calories: {type:Number}
})

const CaloriesBurntSchema = new Schema({
    date: {type:String},
    calories: {type:Number}
})

const ExerciseSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  data: {type:[ExerciseDataSchema],default:() => ({exercises:['Squats','Pushups','Jogging','Pullups','Weight lifting'],
  calories:600})},
  calories: {type:[CaloriesBurntSchema]}
}, {timestamps: true});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;