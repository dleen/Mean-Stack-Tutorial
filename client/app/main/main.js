'use strict';

angular.module('flapperNewsApp')
  .config([
    '$stateProvider',
    function ($stateProvider) {
      $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function (posts) {
            return posts.getAll();
          }]
        },
      });
  }]);
