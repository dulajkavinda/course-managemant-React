const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create schema
const BlogScema = new Schema({
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model("blog", BlogScema);
