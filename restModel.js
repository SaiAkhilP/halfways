var mongoose = require("mongoose");

//Restaurant Schema
var schema = new mongoose.Schema({
    address: {
        building : String,
        coord : [Number],
        street : String,
        zipcode : String
    },
    borough : String,
    cuisine : String,
    grades : [{
        date : {type : Date, default : Date.now},
        grade : String,
        score : Number
    }],
    name : String,
    restaurant_id : {type : String, unique : true}
})

module.exports = mongoose.model("Restaurant", schema);