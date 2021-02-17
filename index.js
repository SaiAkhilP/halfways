var express = require("express");
require('dotenv').config()
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false,}));
const controller = require("./restController");

//configure mongoose
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//MongoDB connection
mongoose.connect(
  process.env.CLUSTER,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("Connected to MongoDB!");
    } else {
      console.log("Failed to connect MongoDB : " + err);
    }
  }
);

//to insert new restaurant
app.post("/restaurant", controller.createRest);

//get list of all restaurants
app.get("/restaurants", controller.findAll);

//get restaurant by restaurant_id
app.get("/restaurant/:restId", controller.findById);

//update address by restaurant_id
app.put("/restaurant/:restId", controller.UpdatebyId);

//delete restaurant by restaurant_id
app.delete("/restaurant/:restId", controller.deleteRest);

//get grades of restaurant by Object_id
app.get("/restaurant/grades/:_id", controller.getGrades);

//get unique cuisines
app.get("/cuisines", controller.cuisines);

//get restaurants with given cuisine
app.get("/restaurants/cuisine/:cuisine", controller.cuisineRest);

app.listen(3000, function () {
  console.log("Server listening on 3000");
});
