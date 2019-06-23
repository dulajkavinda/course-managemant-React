const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const InstructorProfileSchema = new Schema({
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "instructor"
  }
});

module.exports = InstructorProfile = mongoose.model(
  "instructor_p",
  InstructorProfileSchema
);
