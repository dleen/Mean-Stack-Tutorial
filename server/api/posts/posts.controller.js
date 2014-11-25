'use strict';

var _ = require('lodash');
var Post = require('./posts.model');
var Comment = require('./comments.model');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.json(200, posts);
  });
};

// Get a single thing
exports.show = function(req, res) {
  req.post.populate('comments', function(err, post) {
    res.json(post);
  })
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
  });
};

exports.createComment = function (req, res) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function (err, comment) {
    if(err) { return handleError(res, err); }
    req.post.comments.push(comment)

    req.post.save(function (err, post) {
      if(err) { return handleError(res, err); }
      res.json(comment)
    });
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  req.post.upvote(function (err, post) {
    if(err) { return handleError(res, err); }
    res.json(post);
  });
};

exports.updateComment = function(req, res) {
  req.comment.upvote(function (err, comment) {
    if(err) { return handleError(res, err); }
    res.json(comment);
  });
};

// Preload a query based on the url
exports.preloadPost = function (req, res, next, id) {
  var query = Post.findById(id);

  query.exec(function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }

    req.post = post;
    return next();
  });
};

exports.preloadComment = function (req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }

    req.comment = comment;
    return next();
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
