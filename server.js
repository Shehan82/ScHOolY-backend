const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/schooly';
const student = require('./models/studentModel');
const grade = require('./models/gradeModel');
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
            // index : req.body.index,
            fullName : req.body.fullName,
            // address : req.body.address,
            // landPhoneNUm : req.body.landPhoneNum,
            // mobileNum : req.body.mobileNum,
            // mothersName : req.body.mothersName,
            // fathersName : req.body.fathersName,
            // grade : req.body.grade,
            // class : req.body.class,
        sem : [
            {
                name : req.body.sem[0].name,
                marks : req.body.sem[0].marks
            }
            // {
            //     name : req.body.sem[1].name,
            //     marks : req.body.sem[1].marks
            // },
            // {
            //     name : req.body.sem[2].name,
            //     marks : req.body.sem[2].marks
            // }
        ]
        }
    )

    if(s1.save())
    {
        res.send("save successfully!");
    }
    else
    {
        res.send("not save!!!!");
    }

   
    
    
})


app.get('/',(req, res)=>{
    res.send("hello i am shehan");
})


//server
PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})