var flickr = angular.module('flickr', []).
    factory('getFlickr', function($http, $log, $q) {
        //http://api.flickr.com/services/feeds/groups_pool.gne?id=998875@N22‰Î©=en-us&format=json&jsoncallback=?
        return {    
            getImages: function(flickrObj, count){
                var deferred = $q.defer();
                    // Add to open-conf.json
                    flickrObj = flickrObj || {
                        "access_token": "3e5eed3b8ac50831345901fd7c6338be",
                        "user": {
                          "username": "joshhoegen",
                          "bio": "",
                          "profile_picture": "https://farm3.staticflickr.com/2884/buddyicons/75438274@N03_r.jpg?1373636639#75438274@N03",
                          "full_name": "Joshua Hoegen",
                          "id": "75438274@N03"
                        }
                    },
                    count = count || 8;

                var cacheImage, output = {},
                //https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=947350f93ad58b16717ef6eb83a5c31a&user_id=75438274%40N03&format=json
                    request = $http.jsonp('https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=' +
                            flickrObj.access_token + '&user_id=' +
                            flickrObj.user.id + '&format=json' +
                            '&per_page=' + count + '&page=1&extras=date_upload,last_update&jsoncallback=JSON_CALLBACK')
                        .success(function(data, status, headers) {
                             deferred.resolve(data);
                        });
                        
                return deferred.promise;
            }
        }
    });

module.exports = flickr;