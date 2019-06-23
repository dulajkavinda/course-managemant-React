const express = require("express");
const router = express.Router();
const Course = require("../../models/Course");

// @route GET api/course/test
// @desc test course route
// @access Public
router.get("/test", (req, res) => {
  res.send("Course works");
});

router.route("/add").post((req, res) => {
  const newCourse = new Course(req.body);

  newCourse
    .save()
    .then(data => {
      res.status(200).send({ data: data });
    })
    .catch(err => {
      res.status(500).send({ message: err });
    });
});

router.route("/all").get((req, res) => {
  Course.find((err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Course.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/delete/:id").delete((req, res) => {
  let id = req.params.id;

  Course.findByIdAndDelete(id, data => {
    res.status(200).send({ data: data });
  });
});

router.route("/update/:id").put((req, res) => {
  let id = req.params.id;

  return new Promise((resolve, reject) => {
    Course.updateOne({ _id: id }, req.body)
      .then(() => {
        resolve({ status: 200, message: "update comment" });
      })
      .catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      });
  });
});

module.exports = router;
