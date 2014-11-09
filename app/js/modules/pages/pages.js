'use strict';

var pages = angular.module('pages', ['ngResource']);

pages.factory('pages', ['$resource',
    function ($resource) {
        var newResource = $resource('open_conf/pages.json', {}, {
            query: {
                method: 'GET',
                params: {
                    name: 'name'
                }
            }
        });
        return newResource;
    }
]);

pages.controller('pagesList', ['$scope', 'pages',
  function($scope, pages) {
    $scope.pages = pages.query();
    console.log(pages);
    angular.forEach($scope.pages.page, function(v, k) {
      $scope.pages.page[k]['icon'] = k.toLowerCase();
      console.log($scope.pages.page);
    });
    $scope.orderProp = 'name';
  }]);

pages.controller('pagesDetail', ['$scope', '$routeParams', 'pages',
  function($scope, $routeParams, pages) {
    var name = $routeParams.name;
    $scope.pages = pages.get({name: name}, function(pages) {
      $scope.mainImageUrl = pages[name].images;
      $scope.PageActive = pages[name];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

pages.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});