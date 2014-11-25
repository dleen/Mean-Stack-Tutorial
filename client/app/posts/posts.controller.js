'use strict';

angular.module('flapperNewsApp')
  .controller('PostsCtrl', [
    '$scope',
    'posts',
    'post',
    function ($scope, posts, post) {
      $scope.post = post;

      $scope.addComment = function (data) {
        if (data.body === '') { return; }
        posts.addComment(post._id, {
          body: data.body,
          author: 'user',
        }).success(function (comment) {
          $scope.post.comments.push(comment);
        });
        data.body = '';
      };

      $scope.incrementUpvotes = function (comment) {
        posts.upvoteComment(post, comment);
      };
  }]);

