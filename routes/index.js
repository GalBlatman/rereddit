var express = require('express');
var router = express.Router();
var Post = require("../models/Posts");
var Comment = require("../models/Comments");

router.get('/', function(req, res, next) {
  res.send('this is from /!');
});

router.param('post', function(req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post){
    if (err) { return next(err); }
    if (!post) { return next(new Error('can\'t find post')); }

    req.post = post;
    return next();
  });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.get('/posts/:post', function(req, res, next){
  req.post.populate('comments', function(err, post){
    res.send(post);
  });
});

router.put('/posts/:post/upvote', function(req, res){
  req.post.upvote();
  res.post.save(function(err, post){
    if(err){ return next(err); }

    res.json(post);
  });
});

router.put('/comments/:comment/upvote', function(req, res){
  req.comment.upvote();
  res.comment.save(function(err, comment){
    if(err){ return next(err); }

    res.json(comment);
  });
});

module.exports = router;