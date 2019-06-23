const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const keys = require("../../config/keys");

// load input validation
const valitadeAdminRegisterInput = require("../../validation/adminRegister");
const valitadeAdminLoginInput = require("../../validation/adminLogin");
// load Admin model
const Admin = require("../../models/Admin");

// load Instructor model
const Instructor = require("../../models/Instructor");

// @route GET api/admin/test
// @desc test post route
// @access Public
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

router.route("/update/:id").put((req, res) => {
  let id = req.params.id;

  return new Promise((resolve, reject) => {
    Admin.updateOne({ _id: id }, req.body)
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

  Admin.findById(id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
});

router.route("/delete/:id").delete(function(req, res) {
  //delete todo
  Admin.findByIdAndRemove(req.params.id, (err, admin) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
      message: "Todo successfully deleted",
      id: admin.id
    };
    return res.status(200).send(response);
  });
});

// @route POST api/admin/register
// @desc register a admin
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = valitadeAdminRegisterInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email })
    .then(admin => {
      if (admin) {
        errors.email = "email is already there";
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newAdmin = new Admin({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newAdmin.password, salt, function(err, hash) {
            //if (err) throw err;
            newAdmin.password = hash;

            newAdmin
              .save()
              .then(admin => {
                res.json(admin);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/admin/login
// @desc get all as admin
// @access Public
router.get("/all", (req, res) => {
  Admin.find()
    .exec()
    .then(data => {
      res.status(data.status).send({ data: data.data });
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message });
    });
});

// @route POST api/admin/login
// @desc login as admin
// @access Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = valitadeAdminLoginInput(req.body);

  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email }).then(admin => {
    if (!admin) {
      errors.email = "admin not found";
      return res.status(404).json(errors);
    }
    // check password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // admin matched
        //JWT payload
        const payload = {
          id: admin.id,
          name: admin.name,
          avatar: admin.avatar
        };

        // assign token
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "password is incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route POST api/admin/current
// @desc return current admin
// @access Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

// @route POST api/instructor/register
// @desc register a instructor
// @access Private
router.post(
  "/instructor/register",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Instructor.findOne({ email: req.body.email }).then(instructor => {
      if (instructor) {
        return res.status(400).json({ msg: "email is already there" });
      } else {
        const newInstructor = new Instructor({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newInstructor.password, salt, function(err, hash) {
            //if (err) throw err;
            newInstructor.password = hash;

            newInstructor
              .save()
              .then(instructor => {
                res.json(instructor);
              })
              .catch(err => {
                console.log(err);
              });
          });
        });
      }
    });
  }
);

// @route POST api/instructor/:_id
// @desc add courses to a instructor
// @access Private
router.post(
  "/instructor/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Instructor.findOne({ _id: req.params._id }).then(instructor => {
      const newIns = {
        title: req.body.title,
        code: req.body.code
      };

      //add to course array
      instructor.courses.unshift(newIns);

      instructor.save().then(instructor => {
        res.json(instructor);
      });
    });
  }
);

// @route   DELETE api/instructor/:_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/instructor/:_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const deleteIndex = req.body.delete;
    Instructor.findOne({ _id: req.params._id })
      .then(instructor => {
        // Get remove index

        const removeIndex = instructor.courses
          .map(courses => courses._id)
          .indexOf(deleteIndex);

        // Splice out of array
        instructor.courses.splice(removeIndex, 1);

        // Save
        instructor.save().then(ins => res.json(ins));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route GET api/admin/all
// @desc get all admins
// @access Private
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Admin.find(function(err, todos) {
      if (err) {
        console.log(err);
      } else {
        res.json(todos);
      }
    });
  }
);

module.exports = router;
