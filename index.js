const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')

app.use(cors());
app.use(express.json());
const { connection } = require("./db_connect");

connection();
const auth_router = require("./routes/auth.router")
const details_router = require("./routes/details.router")
const exercise_router = require("./routes/exercise.router")
const food_router = require("./routes/food.router")
const happy_router = require("./routes/happy.router")
const auth = require("./middleware/auth")

app.get('/', (req, res) => {
  res.send("Welcome to Health Tracker Api")
});

app.use('/auth', auth_router)
app.use('/details',auth, details_router)
app.use('/exercise',auth, exercise_router)
app.use('/food',auth, food_router)
app.use('/happy',auth, happy_router)

app.use((req, res) => {
  res.status(404).json({ sucess: false, message: "route not found on server please check" })
})


app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found" })
})

app.listen(3000, () => {
  console.log('server started');
});



