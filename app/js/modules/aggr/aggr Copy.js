var aggr = angular.module('aggr', ['ngResource', 'soundcloud', 'instagram', 'google', 'flickr']);

aggr.factory('aggrConfig', ['$http', '$q', '$resource', 'getSoundcloud', 'getInstagram', 'getFlickr', 'getGoogle',
    function ($http, $q, $resource, getSoundcloud, getInstagram, getFlickr, getGoogle) {
        var aggrConfig = {},
            deferred = $q.defer();
        
        var load = function(name, callback){
            $http.get('conf/' + name + '.json').success(function(data){
                deferred.resolve(data);    
            });
            return deferred.promise;
        }
        aggrConfig.cache = function(){
            var newResource = $resource('./aggr.json?json=true', {}, {
                query: {
                    method: 'GET',
                    params: params
                }
            });
            return newResource;
        }
        aggrConfig.feed = function(){
            console.log(load('flickr'))
            var mobilecheck = function() {
                var check = false;
                (function(a,b){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
                return check;
            },
            feeds = {
                //instagram: getInstagram.getImages(this.load('instagram'), (mobilecheck ? 8 : 12)),
                flickr: getFlickr.getImages(load('flickr'), (mobilecheck ? 3 : 6)),
                soundcloud: getSoundcloud.getTracks(load('soundcloud'), (mobilecheck ? 4 : 8)),
                google: getGoogle.getGoogle(load('google'), 3)
            };
            console.log(feeds);
            return feeds
        }
        return aggrConfig;
    
}]).filter('unsafe', function($sce) {
    return $sce.trustAsResourceUrl;
}).filter('html', function($sce) {
    return $sce.trustAsHtml;
}).controller('aggrList', ['$scope', '$sce', '$http', '$routeParams', 'aggrConfig',
    function($scope, $sce, $http, $routeParams, aggrConfig) {
        /*ls = function(){
                var o = {};
                angular.forEach({
                    'instagram': {
                        'count': (mobilecheck ? 8 : 12)
                    }, 'soundcloud': {
                        'count': (mobilecheck ? 4 : 8)
                    }, 'google': {
                        'count': 3
                    }
                }, function(v){
                    o[k] = JSON.parse(localStorage.getItem('JH'+k)) || getInstagram.getImages(aggrConfig.load('instagram'), (mobilecheck ? 8 : 12));
                });
            }
        $scope.aggr = ls || [];
        if ($scope.aggr.length != 0) {
            return;
        }*/
        
        // TODO: Move to seutp module, make available for whole project
        var feed = aggrConfig.feed();
        $scope.aggr = [];
        feed.instagram.then(
            function(images) {
                var output = [];
                angular.forEach(images.data, function(v, k) {
                    var dateFormat = new Date(parseInt(v.created_time) * 1000).getTime();
                    output[k] = {
                        'title': v.caption.text,
                        'date': dateFormat,
                        'embed_url': v.images.standard_resolution.url,
                        'type': 'image',
                        'site_url': v.link
                    };
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading Instagram' + error);
            }
        );
        
        feed.flickr.then(
            function(images) {
                var output = [];
                angular.forEach(images.photos.photo, function(v, k) {
                    var dateFormat = new Date(parseInt(v.lastupdate)).getTime();
                    output[k] = {
                        'title': v.title,
                        'date': dateFormat,
                        'embed_url': 'https://farm' + v.farm +
                            '.staticflickr.com/' + v.server +
                            '/' + v.id + '_' + v.secret + '_c.jpg',
                        'type': 'image',
                        'site_url': v.link
                    };
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading Instagram' + error);
            }
        );

        feed.soundcloud.then(
            function(tracks) {
                var output = [];
                angular.forEach(tracks, function(v, k) {
                    var dateFormat = new Date(v.created_at).getTime();
                    output[k] = {
                        'title': v.title,
                        'type': 'music',
                        'date': dateFormat,
                        'embed_url': 'https://w.soundcloud.com/player/?url=' +
                            encodeURIComponent(v.uri) +
                            '&amp;auto_play=false&amp;hide_related=false&amp;' +
                            'show_comments=true&amp;show_user=true&amp;' +
                            'show_reposts=false&amp;visual=true',
                        'site_url': v.permalink_url
                    };
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading SoundCloud' + error);
            }
        );
        
        feed.google.then(
            function(posts) {
                var output = [];
                angular.forEach(posts.items, function(v, k) {
                    var dateFormat = new Date(v.published).getTime();
                    v = typeof v.object.attachments !== 'undefined' ? v.object.attachments[0] : v.object;
                    v.displayName = v.displayName ? v.displayName : '';
                    output[k] = {
                        'title':  v.displayName,
                        'date': dateFormat,
                        'description': v.content,
                        'embed_url': '',
                        'type': 'text',
                        'site_url': v.url || v.url
                    };
                });
                $scope.aggr.push.apply($scope.aggr, output);
            },
            function(error) {
                console.log('failure loading Instagram' + error);
            }
        );
    }
]);

module.exports = aggr;