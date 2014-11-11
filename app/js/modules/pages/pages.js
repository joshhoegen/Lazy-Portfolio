'use strict';

var pages = angular.module('pages', ['ngResource']);

pages.factory('pages', ['$resource',
    function ($resource) {
        var newResource = $resource('conf/pages.json', {}, {
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
    $scope.pages = pages.query(function(data){
        angular.forEach(data.page, function(v, k) {
            data.page[k]['icon'] = k.toLowerCase();
        });
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

module.exports = pages;