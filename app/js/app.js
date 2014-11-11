'use strict';

var jQuery = require('jquery'),
  angular = require('angular'),
  angularRoute = require('../lib/angular-route/angular-route'),
  angularResource = require('../lib/angular-resource/angular-resource'),
  pages = require('./modules/pages/pages'),
  instagram = require('./modules/instagram/instagram'),
  SC = require('./modules/soundcloud/sdk'),
  soundcloud = require('./modules/soundcloud/soundcloud'),
  aggr = require('./modules/aggr/aggr');
  
console.log(angular);
  
var uscopeApp = angular.module('uscopeApp', [
  'ngRoute',
  'pages',
  'aggr'
]);

uscopeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/art/:name', {
        templateUrl: 'js/modules/pages/templates/detail.html',
        controller: 'aggrList'
      }).when('/music/:name', {
        templateUrl: 'js/modules/pages/templates/detail.html',
        controller: 'aggrList'
      }).otherwise({
        templateUrl: 'js/modules/aggr/templates/aggr.html'
      });
  }]);

uscopeApp.run(function($rootScope, $templateCache, $location) {
  if ($location.$$host.match(/localhost/)) {
    $location.path() + '?id=' + new Date().getTime();
    $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
      console.log('Constant Cache Clear On.');
    });
  }
  
});