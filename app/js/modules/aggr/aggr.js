'use strict';

var aggr = angular.module('aggr', ['ngResource', 'soundcloud']);

aggr.factory('aggr', function(){
  return {
    getSc: function(){
      console.log('+');
    }
  }  
});

aggr.filter('unsafe', function($sce) { return $sce.trustAsResourceUrl; });

aggr.controller('aggrList', ['$scope', '$sce', '$http', 'aggr', 'getSoundcloud',
  function($scope, $sce, $http, aggr, getSoundcloud) {
    $scope.aggr = [];
    //console.log(getSoundcloud());
    //var sc = getSoundcloud();

    
    var scTracks = getSoundcloud.getTracks('https://api.soundcloud.com/users/1781996/tracks.json?client_id=b2d19575a677c201c6d23c39e408927a', insta);
    scTracks.then(function(payload) {
        console.log(payload);
        $scope.aggr.push.apply($scope.aggr, payload);
        console.log($scope.aggr);
    },
    function(errorPayload) {
        console.log('failure loading movie');
    });
    ;
    //console.log(scTracks);
    //console.log($scope);
    //console.log(insta());
  }]);

