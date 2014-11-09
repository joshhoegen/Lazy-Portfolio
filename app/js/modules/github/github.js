angular.module('github', []).
    factory('getGithub', function($http, $log, $q) {
        return {    
            getActivity: function(count){
                var deferred = $q.defer(),
                    cacheImage, output = {},
                    request = $http.jsonp('/repos/:owner/:repo/stats/contributors')
                        .success(function(data, status, headers) {
                            console.log(data);
                             deferred.resolve(data);
                        });
                return deferred.promise;
            }
        }
    });