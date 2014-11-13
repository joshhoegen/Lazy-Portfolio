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
]).controller('pagesList', ['$scope', 'pages',
  function($scope, pages) {
    $scope.pages = pages.query(function(data){
        angular.forEach(data.page, function(v, k) {
            if (!v.icon) {
                data.page[k]['icon'] = 'globe';
            } else {
                data.page[k]['icon'] = v.icon.toLowerCase();
            }
        });
    });    
    $scope.orderProp = 'name';
  }]).filter('unsafe', function($sce) {
    // TODO: Move to seutp module, make available for whole project
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

module.exports = pages;
