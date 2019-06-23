const express = require("express");
// load Instructor model
const Instructor = require("../../models/Instructor");

const router = express.Router();

// @route GET api/instructor/test
// @desc test instructor route
// @access Public
router.get("/test", (req, res) => {
  res.send("Instructor works");
});

router.route("/add").post((req, res) => {
  const newInstructor = new Instructor(req.body);

  newInstructor
    .save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
});

router.route("/all").get((req, res) => {
  Instructor.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Instructor.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/delete/:id").delete((req, res) => {
  let id = req.params.id;

  Instructor.findByIdAndDelete(id, data => {
    res.status(200).send({ data: data });
  });
});

router.route("/update/:id").put((req, res) => {
  let id = req.params.id;

  return new Promise((resolve, reject) => {
    Instructor.updateOne({ _id: id }, req.body)
      .then(() => {
        resolve({ status: 200, message: "update comment" });
      })
      .catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      });
  });
});

module.exports = router;
