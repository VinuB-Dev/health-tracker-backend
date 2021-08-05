const mongoose = require("mongoose");

const {Schema} = mongoose;

const HappyDataSchema = new Schema({
    note: {type:String},
    happy: {type:Number},
    date:{type:String}
})


const HappySchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  data: {type:[HappyDataSchema]},
}, {timestamps: true});

const Happy = mongoose.model("Happy", HappySchema);

module.exports = Happy;