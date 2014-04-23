'use strict';
var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=imperial&cnt=7&callback=JSON_CALLBACK&q=';

angular.module('yoApp')
  .controller('SparklineCtrl', function ($scope) {
    $scope.qq = 'qq';
  })
  .directive('ngCity', function() {
    return {
      controller: function($scope) {
        console.log($scope);
      }
    };
  })
  .directive('ngSparkline', function() {
    return {
      restrict: 'A',
      require: '^ngCity',
      scope: {
        ngCity: '@'
      },
      template: '<div class="sparkline"><h4>Weather for {{ngCity}}</h4></div>',
      controller: ['$scope', '$http', function($scope, $http) {
        $scope.getTemp = function(city) {
          $http({
            method: 'JSONP',
            url: url + city
          }).success(function(data) {
            var weather = [];
            angular.forEach(data.list, function(value){
              weather.push(value);
            });
            $scope.weather = weather;
          });
        };
      }],
      link: function(scope, iElement, iAttrs) {
        scope.getTemp(iAttrs.ngCity);
        scope.$watch('weather', function(newVal) {
          if (newVal) {
            var highs = [],
                width   = 200,
                height  = 80;

            angular.forEach(scope.weather, function(value){
              highs.push(value.temp.max);
            });
          }
        });
      }
    };
  });
