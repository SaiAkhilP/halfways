const Restaurant = require("./restModel");

//get all restaurants by given a limit
exports.findAll = (req, res) => {
  var num = JSON.parse(req.query.limit);
  Restaurant.find().limit(num).then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Error : ", error });
    });
};

//get restaurant by restaurant_id
exports.findById = (req, res) => {
  Restaurant.findOne({ restaurant_id: req.params.restId })
    .then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send("Not found.");
      }
    })
    .catch((error) => {
      res.status(404).send({ message: "Error : ", error });
    });
};

//update restaurant address by restaurant_id
exports.UpdatebyId = (req, res) => {
  Restaurant.findOneAndUpdate(
    { restaurant_id: req.params.restId },
    { $set: { address: req.body.address } }
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(404).send({ message: "Error : Not found/Invalid ID" });
    });
};

//create new restaurant
exports.createRest = (req, res) => {
  var newRest = new Restaurant({
    address: {
      building: req.body.address.building,
      coord: req.body.address.coord,
      street: req.body.address.street,
      zipcode: req.body.address.zipcode,
    },
    borough: req.body.borough,
    cuisine: req.body.cuisine,
    grades: [
      {
        date: req.body.grades.date,
        grade: req.body.grades.grade,
        score: req.body.grades.score,
      },
    ],
    name: req.body.name,
    restaurant_id: req.body.restaurant_id,
  });
  try {
    const data = newRest.save();
    res.json({ Inserted: data });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//delete restaurant by restaurant_id
exports.deleteRest = (req, res) => {
  Restaurant.findOneAndDelete(
    { restaurant_id: req.params.restId },
    { $exists: true }
  )
    .then((data) => {
      if (data) {
        res.status(200).send("Deleted.");
      } else {
        res.status(404).send("Not found.");
      }
    })
    .catch((error) => {
      res.status(404).send({ message: "Error" });
    });
};

//get grades by _id
exports.getGrades = (req, res) => {
  Restaurant.findById(req.params._id)
    .then((data) => {
      res.status(200).send(data.grades);
    })
    .catch((err) => {
      res.status(404).send("Not found.");
    });
};

//get unique cuisines
exports.cuisines = (req, res) => {
  Restaurant.distinct("cuisine")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      res.status(404).send("Error");
    });
};

//get restaurants by cuisine
exports.cuisineRest = (req, res) => {
  Restaurant.find({ cuisine: req.params.cuisine }, { name: 1 })
    .then((data, error) => {
      if (data != "") {
        res.status(200).send(data);
      } else {
        res.status(404).send("Not found.");
      }
    })
    .catch((error) => {
      res.status(404).send("Error");
    });
};
