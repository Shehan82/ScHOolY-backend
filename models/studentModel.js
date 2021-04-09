const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  index: Number,
  fullName: String,
  address: String,
  landNum: Number,
  mobileNum: Number,
  mothersName: String,
  fathersName: String,
  grade: Number,
  class: String,
});

module.exports = mongoose.model("student", studentSchema);
