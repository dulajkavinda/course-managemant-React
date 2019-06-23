const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = Blog = mongoose.model("course", CourseSchema);
