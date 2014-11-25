'use strict';

angular.module('flapperNewsApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap'
])
  .config([
    '$urlRouterProvider',
    '$locationProvider',
    function ($urlRouterProvider, $locationProvider) {
      $urlRouterProvider.otherwise('/home');
      $locationProvider.html5Mode(true);
  }]);
