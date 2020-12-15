const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema(
    {
        grade : Number,
        class : Array
    }
)

module.exports = mongoose.model('grade', gradeSchema)