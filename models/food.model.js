const mongoose = require("mongoose");

const {Schema} = mongoose;

const FoodDataSchema = new Schema({
    breakfast: {type:[String]},
    lunch: {type:[String]},
    dinner: {type:[String]},
    calories: {type:Number}
})

const CaloriesConsumedSchema = new Schema({
    date: {type:String},
    calories: {type:Number}
})

const FoodSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  data: {type:[FoodDataSchema],default:() => ({breakfast:['Dosa','Chutney','Tea','Peanut butter'],
  lunch:['Rice','Dal','Buttermilk','Sambar'],
  dinner:['Roti','Aloo curry','Buttermilk','Fruit platter'],
  calories:2000})},
  calories: {type:[CaloriesConsumedSchema]}
}, {timestamps: true});

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;