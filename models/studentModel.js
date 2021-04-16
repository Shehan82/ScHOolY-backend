const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  index: String,
  fullName: String,
  address: String,
  landNum: Number,
  mobileNum: Number,
  mothersName: String,
  fathersName: String,
  grade: Number,
  class: String,
  isRemoved: Number,
});

module.exports = mongoose.model("student", studentSchema);
