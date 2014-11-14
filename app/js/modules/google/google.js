angular.module('google', []).
    factory('getGoogle', function($http, $log, $q) {
        return {    
            getGoogle: function(googObj, count){
                var deferred = $q.defer();
                googObj = googObj || {
                    "id": "103713636134156210756",
                    "key": "AIzaSyBmCqhO68lrdwivtt0tmw7TnrZmvoAlsoc"
                };
                var cacheImage, output = {},
                    request = $http.get('https://www.googleapis.com/plus/v1/people/' +
                                googObj.id + '/activities/public?maxResults=' +
                                count + '&key='+
                                googObj.key)
                            .success(function(data, status, headers) {
                                 deferred.resolve(data);
                            });
                return deferred.promise;
            }
        }
    });