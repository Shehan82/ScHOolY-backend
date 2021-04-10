const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  index: Number,
  term: Number,
  grade: Number,
  marks: Array,
});

module.exports = mongoose.model("result", resultSchema);
