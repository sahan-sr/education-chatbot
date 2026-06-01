const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  intent: String,
  keywords: [String],
  answer: String
});

module.exports = mongoose.model("CourseInfo", courseSchema);