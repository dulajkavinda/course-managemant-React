const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const InstructorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Instructor = mongoose.model("instructor", InstructorSchema);
