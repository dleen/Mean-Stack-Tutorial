'use strict';

var express = require('express');
var controller = require('./posts.controller');

var router = express.Router();

router.get('', controller.index);
router.post('', controller.create);
router.get('/:post', controller.show);
router.put('/:post/upvote', controller.update);
router.post('/:post/comments', controller.createComment);
router.put('/:post/comments/:comment/upvote', controller.updateComment);

router.param('post', controller.preloadPost);
router.param('comment', controller.preloadComment);

module.exports = router;
