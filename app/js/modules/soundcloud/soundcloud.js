var soundcloud = angular.module('soundcloud', []).
    factory('getSoundcloud', function($http, $log, $q) {
        return {
            getTracks: function(scObj, count, callback) {
                var deferred = $q.defer();
                count = count || 8,
                scObj = scObj || {
                    "client_id": "b2d19575a677c201c6d23c39e408927a",
                    "default_url": "https://soundcloud.com/byutifu/"
                };
                SC.initialize({
                    client_id: scObj.client_id
                }).get('/resolve', {
                    url: scObj.url || scObj.default_url,
                    limit: count
                },function(tracks) {
                    if (callback) {
                       callback();
                    }
                    tracks = tracks.slice(0, count);
                    deferred.resolve(tracks);
                });
                return deferred.promise;
            }
        }
    });

module.exports = soundcloud;