'use strict';

var aggr = angular.module('aggr', ['ngResource']);

aggr.factory('aggr', ['$resource',
    function ($resource) {
        
    }
]);

aggr.filter('unsafe', function($sce) { return $sce.trustAsResourceUrl; });

aggr.controller('aggrList', ['$scope', '$sce', '$http', 'aggr',
  function($scope, $sce, $http, aggr) {
    $scope.aggr = [];
    SC.initialize({
        client_id: 'b2d19575a677c201c6d23c39e408927a'
    });
    var sc = function(){
        var output = {},
            results = SC.get('/resolve', {
                url: 'http://soundcloud.com/byutifu/tracks',
                limit: 8
            }, function (track) {
                track = track.slice(0, 8);
                angular.forEach(track, function(v, k) {
                    //console.log(v);
                    var dateFormat = new Date(v.last_modified).getTime();
                    $scope.aggr.push( {
                        'title': v.title,
                        'type': 'music',
                        'date': dateFormat,
                        'embed_url': 'https://w.soundcloud.com/player/?url=' +
                        encodeURIComponent(v.uri) +
                        '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'
                    });
                });
                insta();
            });
    },
    insta = function(){
        var account, action, animationDelay, count, getInstagram, getNextPhoto, photos, show, user;
        user = {
          'access_token': '585198746.afb223f.7e34424d217343098ac6974ed1628216',
          'user': {
            'username': 'joshhoegen',
            'bio': '',
            'website': 'http:\/\/127.0.0.1:8000',
            'profile_picture': 'http:\/\/distilleryimage10.ak.instagram.com\/06cb29062c2f11e387d622000aeb0b75_7.jpg',
            'full_name': 'Joshua Hoegen',
            'id': '585198746'
          }
        };
      
        account = user;
        count = 10; 
        photos = [];
        show = 10;
        animationDelay = 5000;    
        action = 'fadeInUp';
        var cacheImage, output = {},
            request = $http.jsonp('https://api.instagram.com/v1/users/' + account.user.id + '/media/recent?access_token=' + account.access_token + '&count=' + count + '&callback=JSON_CALLBACK')
                .success(function(data, status, headers) {
                    console.log($scope.aggr);
                    angular.forEach(data.data, function(v, k) {
                        console.log(v);
                        var dateFormat = new Date(parseInt(v.created_time) * 1000).getTime();
                        $scope.aggr.push({
                            'title': v.caption.text,
                            'date': dateFormat,
                            'embed_url': v.images.standard_resolution.url,
                            'type': 'image'
                        });
                        
                    })
                    // getting super functional and messy
                    $scope.aggr.slice().reverse();
                })
                .error(function(data, status, headers){
                    console.log('error');
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                });
    }
    console.log(sc());
  }]);

