var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var route = require('./api/routes/todoListRoutes');
var Task = require('./api/models/todoListModel');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb',{ useMongoClient: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Origin, Authorization, Accept');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
/*
app.use(function(req,res){
  res.status(404).send({ url: req.originalUrl + ' not found' })
});
*/
route(app);
app.listen(port);
console.log('todo list RESTful API server started on: ' + port);
