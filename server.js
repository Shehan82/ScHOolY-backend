const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/schooly';
const student = require('./models/studentModel');
const grade = require('./models/gradeModel');
const app = express();
const url2 = 'mongodb+srv://shehan82:GO8aqOOYhjOFaPv0@cluster0.ego3n.mongodb.net/schooly?retryWrites=true&w=majority'

//DB connection
mongoose.connect(url2, {useNewUrlParser:true, useFindAndModify: false});
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
    // res.send(req.params.grade);
    var grade = parseInt(req.params.grade);
    var cls = req.params.class;
    student.find({"grade":`${grade}`, "class":`${cls}`},(err,data)=>{
        if(err)
        {
            res.status(500).send(err+"ha");
        }
        else
        {
            res.status(200).send(data);
        }
    })
})

app.get('/classes/:grade',(req, res)=>{
    var grde = req.params.grade;
    grade.find({"grade":`${grde}`},(err, data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})

app.get('/index/:indexNum', (req,res)=>{
    var indexNum = parseInt(req.params.indexNum);
    student.find({"index":`${indexNum}`},(err,data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})

app.get('/classDetails/:grade', (req, res)=>{
    var grd = parseInt(req.params.grade);
    
    grade.find({"grade":`${grd}`}, (err, data)=>{
        if(err)
        {
            res.status(500).send(err);
        }
        else
        {
            res.status(200).send(data);
        }
    })
})



//server
PORT = process.env.PORT || 9001;
app.listen(PORT, ()=>{console.log(`Server running on port ${PORT}`)})