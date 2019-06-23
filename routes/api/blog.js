const express = require("express");
const router = express.Router();

const Blog = require("../../models/Blog");

router.get("/test", (req, res) => {
  Admin.find()
    .exec()
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      res.status(data.status).send({ data: data.data });
    });
});

router.route("/addStudent").post((req, res) => {
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

router.post("/add", (req, res) => {
  var blog = new Blog({
    title: req.body.title,
    summary: req.body.summary,
    description: req.body.description
  });
  blog
    .save()
    .then(blog => {
      res.json(blog);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/all", (req, res) => {
  Blog.find()
    .exec()
    .then(data => {
      res.status(200).send({ data });
    })
    .catch(err => {
      res.status(data.status).send({ data: data.data });
    });
});

router.route("/delete/:id").delete(function(req, res) {
  //delete todo
  Blog.findByIdAndRemove(req.params.id, (err, blog) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Todo successfully deleted",
      id: blog.id
    };
    return res.status(200).send(response);
  });
});

router.route("/update/:id").put((req, res) => {
  let id = req.params.id;

  return new Promise((resolve, reject) => {
    Blog.updateOne({ _id: id }, req.body)
      .then(() => {
        resolve({ status: 200, message: "update comment" });
      })
      .catch(err => {
        reject({ status: 500, message: "Error:- " + err });
      });
  });
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  Blog.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
