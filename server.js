const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/schooly';
const student = require('./models/student');
const app = express();

//DB connection
mongoose.connect(url, {useNewUrlParser:true, useFindAndModify: false});
mongoose.connection.on('open', ()=>{console.log("Database connected!")});

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/create', (req, res)=>{
    const s1 = new student(
        {
            fullName : req.body.fullName,
        // address : String,
        // landPhoneNUm : Number,
        // mobileNum : Number,
        // mothersName : String,
        // fathersName : String,
        // grade : Number,
        // class : String,
        sem : [
            {
                name : req.body.sem[0].name,
                marks : req.body.sem[0].marks
            },
            {
                name : req.body.sem[0].name,
                marks : req.body.sem[0].marks
            }
        ]
        }
    )

    res.send(s1);
})


app.get('/',(req, res)=>{
    res.send("hello i am shehan");
})


//server
PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})