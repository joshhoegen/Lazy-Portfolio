angular.module('google', []).
    factory('getGoogle', function($http, $log, $q) {
        return {    
            getGoogle: function(){
                var deferred = $q.defer(),
                    cacheImage, output = {},
                    //zeta-period-763
                    request = $http.get('https://www.googleapis.com/plus/v1/people/103713636134156210756/activities/public?maxResults=4&key=AIzaSyBmCqhO68lrdwivtt0tmw7TnrZmvoAlsoc')
                        .success(function(data, status, headers) {
                            console.log(data);
                             deferred.resolve(data);
                        });
                return deferred.promise;
            }
        }
    });