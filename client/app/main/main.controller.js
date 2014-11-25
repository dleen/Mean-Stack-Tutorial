'use strict';

angular.module('flapperNewsApp')
  .factory('posts', ['$http', function ($http) {
    var o = {
      posts: []
    };
    o.getAll = function () {
      return $http.get('/api/posts').success(
      function (data) {
        angular.copy(data, o.posts);
      });
    };
    o.create = function (post) {
      return $http.post('/api/posts', post).success(function (data) {
        o.posts.push(data);
      });
    };
    o.upvote = function (post) {
      return $http.put('/api/posts/' + post._id + '/upvote')
        .success(function (data) {
          /*jshint unused: false */
          post.upvotes += 1;
        });
    };
    o.get = function (id) {
      return $http.get('/api/posts/' + id).then(function (res) {
        return res.data;
      });
    };
    o.addComment = function (id, comment) {
      return $http.post('/api/posts/' + id + '/comments', comment);
    };
    o.upvoteComment = function (post, comment) {
      return $http.put('/api/posts/' + post._id +
                       '/comments/' + comment._id + '/upvote')
        .success(function (data) {
          /*jshint unused: false */
          comment.upvotes += 1;
        });
    };

    return o;
  }]);

angular.module('flapperNewsApp')
  .controller('MainCtrl', [
    '$scope',
    'posts',
    function ($scope, posts) {
      $scope.posts = posts.posts;

      $scope.addPost = function (data) {
        if (!data.title || data.title === '') { return; }
        posts.create({
          title: data.title,
          link: data.link,
        });
        data.title = '';
        data.link = '';
      };

      $scope.incrementUpvotes = function (post) {
        posts.upvote(post);
      };
  }]);

