const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/schooly";
const student = require("./models/studentModel");
const grade = require("./models/gradeModel");
const gradeSubject = require("./models/gradeSubject");
const resultsModel = require("./models/resultsModel");
const app = express();
require("dotenv").config();
const url2 =
  "mongodb+srv://shehan82:GO8aqOOYhjOFaPv0@cluster0.ego3n.mongodb.net/schooly?retryWrites=true&w=majority";

//DB connection
mongoose.connect(url2, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

mongoose.connection.on("open", () => {
  console.log("Database connected!");
});

// if (process.env.NODE_ENV === "production") {
//   // Exprees will serve up production assets
//   app.use(express.static("client/build"));

//   // Express serve up index.html file if it doesn't recognize route
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   req.header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const TWO_HOURS = 1000 * 60 * 60 * 2;
// const SESS_LIFETIME = TWO_HOURS;
// const SESS_SECRET = "apple orange";

// const users = [
//   { id: 1, name: "shehan", email: "shehan@gmail.com", password: "shehan" },
//   {
//     id: 2,
//     name: "sandeepa",
//     email: "sandeepa@gmail.com",
//     password: "sandeepa",
//   },
// ];

app.post("/create", (req, res) => {
  const s1 = new student({
    index: req.body.index,
    fullName: req.body.fullName,
    address: req.body.address,
    landNum: req.body.landNum,
    mobileNum: req.body.mobileNum,
    mothersName: req.body.mothersName,
    fathersName: req.body.fathersName,
    grade: req.body.grade,
    class: req.body.class,
    isRemoved: 0,
  });

  if (s1.save()) {
    res.send("ok");
  } else {
    res.send("no");
  }
});

app.post("/updateStu", (req, res) => {
  console.log(req.body.landNum);
  student.findOneAndUpdate(
    { index: req.body.index },
    {
      fullName: req.body.fullName,
      address: req.body.address,
      landNum: req.body.landNum,
      mobileNum: req.body.mobileNum,
      mothersName: req.body.mothersName,
      fathersName: req.body.fathersName,
      grade: req.body.grade,
      class: req.body.class,
    },
    (err, data) => {
      if (err) {
        res.send("no");
      } else {
        console.log(data);
        res.send("yes");
      }
    }
  );
});

app.post("/removeStudent", (req, res) => {
  student.findOneAndUpdate(
    { index: req.body.index },
    { isRemoved: 1 },
    (err, data) => {
      if (err) {
        res.send("no");
      } else {
        console.log(data);
        res.send("yes");
      }
    }
  );
});

app.post("/createResult", (req, res) => {
  const s1 = new resultsModel({
    index: req.body.index,
    term: req.body.term,
    grade: req.body.grade,
    marks: req.body.marks,
  });

  if (s1.save()) {
    res.send("ok");
  } else {
    res.send("no");
  }
});

app.post("/create/stu", (req, res) => {
  res.send(req.body);
});

app.post("/create/grade", (req, res) => {
  const g1 = new grade({
    grade: req.body.grade,
    class: req.body.class,
  });

  if (g1.save()) {
    res.send("grade added!");
  } else {
    res.send("grade not added");
  }
});

app.get("/gradeSub", (req, res) => {
  gradeSubject.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/indexResult/:indexNum", (req, res) => {
  resultsModel.find({ index: req.params.indexNum }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// app.get("/find", (req, res) => {
//   resultsModel.find({ index: /1800/ }, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(200).send(data);
//     }
//   });
// });

app.get("/find/:indexNum", (req, res) => {
  student.find(
    { index: { $regex: req.params.indexNum, $options: "i" }, isRemoved: 0 },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    }
  );
});

app.get("/findAll", (req, res) => {
  student.find({ isRemoved: 0 }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/gradeSub", (req, res) => {
  const g1 = new gradeSubject({
    grade: req.body.grade,
    subjects: req.body.subjects,
  });

  if (g1.save()) {
    res.send("grade added!");
  } else {
    res.send("grade not added");
  }
});

app.get("/grade", (req, res) => {
  grade.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/grade/:grade/:class", (req, res) => {
  // res.send(req.params.grade);
  var grade = parseInt(req.params.grade);
  var cls = req.params.class;
  student.find({ grade: `${grade}`, class: `${cls}` }, (err, data) => {
    if (err) {
      res.status(500).send(err + "ha");
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/classes/:grade", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  var grde = req.params.grade;
  grade.find({ grade: `${grde}` }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/index/:indexNum", (req, res) => {
  var indexNum = parseInt(req.params.indexNum);
  student.find({ index: `${indexNum}` }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get("/classDetails/:grade", (req, res) => {
  var grd = parseInt(req.params.grade);

  grade.find({ grade: `${grd}` }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

//server
PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
