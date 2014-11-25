'use strict';

angular.module('flapperNewsApp')
  .config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: 'app/posts/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts',
            function ($stateParams, posts) {
              return posts.get($stateParams.id);
          }]
        },
      });
  }]);
