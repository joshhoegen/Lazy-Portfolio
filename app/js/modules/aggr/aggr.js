'use strict';

var aggr = angular.module('aggr', ['ngResource']);

aggr.factory('aggr', ['$resource',
    function ($resource) {
        
    }
]);

aggr.filter('unsafe', function($sce) { return $sce.trustAsResourceUrl; });

aggr.controller('aggrList', ['$scope', '$sce', 'aggr',
  function($scope, $sce, aggr) {
    SC.initialize({
        client_id: 'b2d19575a677c201c6d23c39e408927a'
    });
    SC.get('/resolve', {
        url: 'http://soundcloud.com/byutifu/tracks',
        limit: 10
    }, function (track) {
        track = track.slice(0, 3);
        angular.forEach(track, function(v, k) {
            console.log(v);
            track[k].widget_url = 'https://w.soundcloud.com/player/?url=' +
            encodeURIComponent(v.uri) +
            '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';    
        });
        $scope.aggr = track;
    });    
  }]);

