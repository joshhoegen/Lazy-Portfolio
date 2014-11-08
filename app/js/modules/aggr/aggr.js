var aggr = angular.module('aggr', ['ngResource', 'soundcloud', 'instagram']);

aggr.factory('aggr', function() {
    return {
        getSc: function() {
            console.log('+');
        }
    }
});

aggr.filter('unsafe', function($sce) {
    return $sce.trustAsResourceUrl;
});

aggr.controller('aggrList', ['$scope', '$sce', '$http', 'aggr', 'getSoundcloud', 'getInstagram',
    function($scope, $sce, $http, aggr, getSoundcloud, getInstagram) {
        $scope.aggr = [];
        var instagram = getInstagram.getImages(),
            scTracks = getSoundcloud.getTracks('http://soundcloud.com/byutifu/tracks');
        instagram.then(
            function(images) {
                var output = [];
                angular.forEach(images.data, function(v, k) {
                    var dateFormat = new Date(parseInt(v.created_time) * 1000).getTime();
                    output[k] = {
                        'title': v.caption.text,
                        'date': dateFormat,
                        'embed_url': v.images.standard_resolution.url,
                        'type': 'image'
                    };
                    
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading Instagram' + error);
            }
        );

        scTracks.then(
            function(tracks) {
                var output = [];
                tracks = tracks.slice(0, 8);
                angular.forEach(tracks, function(v, k) {
                    var dateFormat = new Date(v.created_at).getTime();
                    output[k] = {
                        'title': v.title,
                        'type': 'music',
                        'date': dateFormat,
                        'embed_url': 'https://w.soundcloud.com/player/?url=' +
                            encodeURIComponent(v.uri) +
                            '&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true'
                    };
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading SoundCloud' + error);
            }
        );
    }
]);