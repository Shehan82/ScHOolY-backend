const mongoose = require("mongoose");

const gradeSubjectSchema = mongoose.Schema({
  grade: Number,
  subjects: Object,
});

module.exports = mongoose.model("gradeSubject", gradeSubjectSchema);
