// var http=require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var models = require('./models')
var ObjectId = require("mongodb").ObjectId

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/api/plumbers', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var cell_no = req.body.cell_no;
  var shift = req.body["shift[]"];
  var day = req.body.day;

  console.log(req.body);
  // console.log(req.body["shift[]"]);
  console.log(shift);

  models.plumbersInfo.find({
      name: name,
      email: email,
      cell_no: cell_no,
      day: day,
      shift: shift
    },
    function(err, plumber) {
      if (err) {
        return err
      } else if (plumber.length === 0) {
        // console.log('not found');
        models.plumbersInfo.create({
          name: req.body.name,
          email: req.body.email,
          cell_no: req.body.cell_no,
          day: req.body.day,
          shift: req.body["shift[]"]
        }, function(err, results) {
          if (err) {
            return err
          } else {
            res.json(results)
          }
        });
      }
    })
});
app.get('/api/plumbers', function(req, res) {
  models.plumbersInfo.find({},
    function(err, allPlumbers) {
      if (err) {
        return err
      } else {
        res.json(allPlumbers)
      }
    })
});
app.get('/api/plumbers/search', function(req, res) {
  models.plumbersInfo.find({
    "day": {
        $regex: day,
        $options: "i"
      },
      "shift": {
        $regex: shift,
        $options: "i"
      }
  },
    function(err, searchedPlumber) {
      if (err) {
        return err
      } else {
        res.json(searchedPlumber)
      }
    })
});
app.post('/api/plumber/book/:id', function(req, res) {
  models.plumberInfo.find({
    _id: ObjectId(id)
  }, function(err, bookedPlumber) {
    if (err) {
      return err
    } else if (bookedPlumber.length === 0) {
      models.emplyedPlumbers.create({
        name: bookedPlumber.name,
        email: bookedPlumber.email,
        cell_no: bookedPlumber.cell_no,
        day: bookedPlumber.day,
        shift: bookedPlumber.shift,
        employername: req.body.employername,
        employeremail: req.body.employeremail,
        jobDescription: req.body.jobDescription
      }, function(err, employed) {
        if (err) {
          return err;
        } else {
          res.json(employed)
        }
      })
    }
  })
})

var port = process.env.PORT || 1993

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
