const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserDetailsSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  age:{type:Number, required: true},
  weight: {type:Number, required: true},
  height: {type:Number, required: true},
  gender: {type:String, required: true},
}, {timestamps: true});

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);

module.exports = UserDetails;