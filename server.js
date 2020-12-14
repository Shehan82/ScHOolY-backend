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
            index : req.body.index,
            fullName : req.body.fullName,
            address : req.body.address,
            landNum : req.body.landNum,
            mobileNum : req.body.mobileNum,
            mothersName : req.body.mothersName,
            fathersName : req.body.fathersName,
            grade : req.body.grade,
            class : req.body.class,
        sem : [
            {
                name : req.body.sem[0].name,
                marks : req.body.sem[0].marks
            },
            {
                name : req.body.sem[1].name,
                marks : req.body.sem[1].marks
            },
            {
                name : req.body.sem[2].name,
                marks : req.body.sem[2].marks
            }
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

app.post('/create/grade', (req, res)=>{
    const g1 = new grade(
        {
            grade : req.body.grade,
            class : req.body.class
        }
    )

    if(g1.save())
    {
        res.send("grade added!");
    }
    else
    {
        res.send("grade not added");
    }
})


app.get('/grade',(req, res)=>{
    grade.find((err, data)=>{
        if(err)
        {
            res.status(500).send(err)
        }
        else
        {
            res.status(200).send(data)
        }
    })
    
});

app.get('/grade/:grade/:class', (req, res)=>{
    res.send(req.params.grade);
})



//server
PORT = process.env.PORT || 9000;
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})