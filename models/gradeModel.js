const mongoose = require('mongoose');

const gradeSchema = mongoose.Schema(
    {
        grade : Number,
        class : Object
    }
)

module.exports = mongoose.model('grade', gradeSchema)