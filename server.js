const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const admin = require("./routes/api/admin");
const instructor = require("./routes/api/instructor");
const course = require("./routes/api/course");
const sendmail = require("./routes/api/sendmail");
const blog = require("./routes/api/blog");

const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// passport middleware
app.use(passport.initialize());

// passport config
require("./config/passport")(passport);

//DB Config
const db = require("./config/keys").mongoURI;

// connecting to mongoDB
mongoose.connect(db, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/api/admin", admin);
app.use("/api/instructor", instructor);
app.use("/api/course", course);
app.use("/api/sendmail", sendmail);
app.use("/api/blog", blog);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is runnig on port ${port}`);
});
