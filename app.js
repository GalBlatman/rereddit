var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

var Post = require("./models/Posts");
var Comment = require("./models/Comments");

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
app.use('/users', users);

mongoose.connect('mongodb://localhost/rereddit');

app.post('/posts', function(req, res, next) {
  var post = new Post(req.body);

  post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
}); 

app.get('/posts', function (req, res) {
  Post.find(function (error, post) {
    res.send(post);
  });
}); 

var port = process.env.PORT || '4000';

app.listen(port);