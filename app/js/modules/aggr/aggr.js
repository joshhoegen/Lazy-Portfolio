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
    var sc = SC.get('/resolve', {
        url: 'http://soundcloud.com/byutifu/tracks',
        limit: 10
    }, function (track) {
        var output = {};
        angular.forEach(track, function(v, k) {
            console.log(v);
            track = track.slice(0, 3);
            output[k].title = v.title;
            output[k].date = v.last_modified;
            output[k].embed_url = 'https://w.soundcloud.com/player/?url=' +
                encodeURIComponent(v.uri) +
                '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true';    
        });
        return track;
    }),
    insta = function(){
        var cacheImage, html = '';
        return $.getJSON('https://api.instagram.com/v1/users/' + account.user.id + '/media/recent?access_token=' + account.access_token + '&count=' + count + '&callback=?', function(data) {
            angular.forEach(data.data, function(i, image) {
                html += '<img src="'+image.images.low_resolution.url+'" alt="'+image.images.title+'" />';
            });
            html += html+html+html+html+html;
            html += html //co-co-combo breaker!
            $('.instagram').append(html);
        });
    }
    $scope.aggr = items;
  }]);

