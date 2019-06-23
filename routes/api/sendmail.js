const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// @route GET api/course/test
// @desc test course route
// @access Public
router.get("/test1", (req, res) => {
  res.send("Course works");
});

// @route POST api/mail/send
// @desc send mail
// @access Public
router.post("/test", (req, res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3> Your Login Details </h3>
    <ul>
      <li>Name : ${req.body.name}</li>
      <li>Username : ${req.body.email}</li>
      <li>Password : ${req.body.password}</li>
    </ul>
    <p>Please change your password</p>
    `;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use SSL
      auth: {
        user: "dulajkavindatest123@gmail.com", // generated ethereal user
        pass: "dulaj123" // generated ethereal password
      }
    });

    let mailOptions = {
      from: "dulajkavindatest123@gmail.com", // sender address
      to: req.body.email, // list of receivers
      subject: "New Account Registration details", // Subject line
      text: req.body.password,
      html: htmlEmail // html body
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    });
  });
});

module.exports = router;
