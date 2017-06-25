var aggr = angular.module('aggr', ['ngResource', 'soundcloud', 'instagram', 'google', 'flickr']);

aggr.factory('aggrConfig', ['$resource', '$http', '$q', 'getSoundcloud', 'getInstagram', 'getFlickr', 'getGoogle',
    function ($resource, $http, $q, getSoundcloud, getInstagram, getFlickr, getGoogle) {
        var aggrConfig = {}
        aggrConfig.load = function(name){
            var newResource = $resource('conf/' + name + '.json', {}, {
                query: {
                    method: 'GET'
                }
            });
        },
        aggrConfig.cache = function(params){
            //console.log(params);
            var deferred = $q.defer();
            $http.get('./cache/proxy.php', {params: params}).success(function(data, status, headers) {
                deferred.resolve(data);
            });
            return deferred.promise;
        },
        // will accept object to filter/isolate feeds feed('soundcloud') or feed(['soundcloud', 'instagram'])
        aggrConfig.feed = function(){
            var deferred = $q.defer(),
                mobilecheck = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
                feeds = {
                    instagram: getInstagram.getImages(aggrConfig.load('instagram'), (mobilecheck ? 8 : 12)),
                    flickr: getFlickr.getImages(aggrConfig.load('flickr'), (mobilecheck ? 4 : 6)),
                    soundcloud: getSoundcloud.getTracks(aggrConfig.load('soundcloud'), (mobilecheck ? 4 : 8)),
                    google: getGoogle.getGoogle(aggrConfig.load('google'), 5)
                };

            return feeds;
        }
        return aggrConfig;

}]).filter('unsafe', function($sce) {
    return $sce.trustAsResourceUrl;

}).filter('html', function($sce) {
    return $sce.trustAsHtml;

}).controller('aggrList', ['$scope', '$sce', '$http', '$routeParams', 'aggrConfig', 'getSoundcloud', 'getInstagram', 'getFlickr', 'getGoogle',
    function($scope, $sce, $http, $routeParams, aggrConfig, getSoundcloud, getInstagram, getFlickr, getGoogle) {
        $scope.feeds = aggrConfig.feed();
        $scope.aggr = [];
        var formatOutput = function(feed, title, date, type, embedUrl, siteUrl, description){
            var output = {
                'title': title,
                'date': date,
                'embed_url': embedUrl,
                'type': type,
                'site_url': siteUrl,
                'description': description
            };
            return output;
        },
        buildScope = function(feed, data){
            $scope.aggr.push.apply($scope.aggr, data);
            // TODO: modularize cache
            aggrConfig.cache({feed: feed, aggr: angular.extend({}, data)});
        },
        feedError = function(feed, error) {
            console.log('failure loading Instagram' + error);
        },
        social = function() {
          //  (function() {
          //    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
          //    po.src = 'https://apis.google.com/js/platform.js';
          //    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
          //  })();
          //  (function(d, s, id) {
          //    var js, fjs = d.getElementsByTagName(s)[0];
          //    if (d.getElementById(id)) return;
          //    js = d.createElement(s); js.id = id;
          //    js.src = '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0';
          //    fjs.parentNode.insertBefore(js, fjs);
          //  }(document, 'script', 'facebook-jssdk'));
        };

        aggrConfig.cache({json: 'true'}).then(function(data){
            if (typeof data === 'object') {
                var arr = [];
                angular.forEach(data, function(v, k){
                    angular.forEach(v, function(v, k){
                        arr.push(v);
                    })
                });
                $scope.aggr = arr;
            } else {
                // TO DO: Research how to not be redundant with very different data maps.
                $scope.feeds.instagram.then(
                    function(images) {
                        var output = [];
                        angular.forEach(images.data, function(v, k) {
                            var dateFormat = new Date(parseInt(v.created_time) * 1000).getTime();
                            output[k] = formatOutput('instagram',
                                v.caption.text, dateFormat, 'image',
                                v.images.standard_resolution.url,
                                v.link);
                        });
                        buildScope('instagram', output);
                    },
                    function(error) {
                        console.log('failure loading Instagram' + error);
                    }
                );

                $scope.feeds.flickr.then(
                    function(images) {
                        var output = [];
                        angular.forEach(images.photos.photo, function(v, k) {
                            var dateFormat = new Date(parseInt(v.lastupdate)).getTime();
                            output[k] = formatOutput('flickr',
                                // Flickr Needs * 1000
                                v.title, (dateFormat * 1000), 'image',
                                'https://farm' + v.farm +
                                    '.staticflickr.com/' + v.server +
                                    '/' + v.id + '_' + v.secret + '_c.jpg',
                                v.link);
                        });
                        buildScope('flickr', output);
                    },
                    function(error) {
                        console.log('failure loading Instagram' + error);
                    }
                );

                $scope.feeds.soundcloud.then(
                    function(tracks) {
                        var output = [];
                        angular.forEach(tracks, function(v, k) {
                            var dateFormat = new Date(v.created_at).getTime();
                            output[k] = formatOutput('soundcloud',
                                v.title, dateFormat, 'music',
                                'https://w.soundcloud.com/player/?url=' +
                                    encodeURIComponent(v.uri) +
                                    '&amp;auto_play=false&amp;hide_related=false&amp;' +
                                    'show_comments=true&amp;show_user=true&amp;' +
                                    'show_reposts=false&amp;visual=true',
                                v.permalink_url);
                        });
                        buildScope('soundcloud', output);
                    },
                    function(error) {
                        console.log('failure loading SoundCloud' + error);
                    }
                );
                $scope.feeds.google.then(
                    function(posts) {
                        var output = [];
                        angular.forEach(posts.items, function(v, k) {
                            var dateFormat = new Date(v.published).getTime();
                            v = v.object;
                            v.displayName = v.displayName ? v.displayName : '';
                            v.content = '<i class="fa fa-star" aria-hidden="true"></i> '+ v.content;
                            var attachments = v.attachments && v.attachments.length ? v.attachments : false;

                            if (attachments && attachments[0].fullImage) {
                              v.content += '<img class="google-img" src="' + attachments[0].fullImage.url+ '" />';
                            }

                            output[k] = formatOutput('google',
                                v.displayName, dateFormat, 'text',
                                '',
                                v.url,
                                v.content);
                        });
                        buildScope('google', output);
                    },
                    function(error) {
                        console.log('failure loading Instagram' + error);
                    }
                );
            }
            // social();
        });
    }
]);

module.exports = aggr;
