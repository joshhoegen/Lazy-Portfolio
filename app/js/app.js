'use strict';

/* App Module */

var uscopeApp = angular.module('uscopeApp', [
  'ngRoute',
  'kaleidescope',
  'pages',
  'ngAnimate',
  'aggr'
]);

uscopeApp.config(['$routeProvider',
  function($routeProvider) {
    //#/art/
    $routeProvider.
      /*when('/art', {
        templateUrl: 'js/modules/pages/templates/page-list.html',
        controller: 'pagesListCtrl'
      }).*/
      when('/art/:name', {
        templateUrl: 'js/modules/pages/templates/detail.html',
        controller: 'pagesDetailCtrl'
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