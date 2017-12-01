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
  var shift = req.body.shift;
  var day = req.body.day;

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
          shift: req.body.shift
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

var port = process.env.PORT || 1993

app.use(function(err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err)
})

app.listen(port);
