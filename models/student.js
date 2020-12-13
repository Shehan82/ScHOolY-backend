const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
    {
        
        fullName : String,
        // address : String,
        // landPhoneNUm : Number,
        // mobileNum : Number,
        // mothersName : String,
        // fathersName : String,
        // grade : Number,
        // class : String,
        sem : [
            {
                name : String,
                marks : Object,
            }
            // {
            //     name : String,
            //     marks : Object,
            // },
            // {
            //     name : String,
            //     marks : Object,
            // }
        ]
    }
)

module.exports = mongoose.model('student', studentSchema);