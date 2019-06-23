const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const StudentSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  bdate: {
    type: String,
    required: true
  },
  email: {
    type: Date,
    default: Date.now
  },
  password: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model("studnet", StudentSchema);
