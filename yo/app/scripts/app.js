'use strict';

angular
  .module('yoApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/sparkline', {
        templateUrl: 'views/sparkline.html',
        controller: 'SparklineCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
