angular.module('soundcloud', []).
    factory('getSoundcloud', function($http, $log, $q) {
        return {
            getTracks: function(url, count, callback) {
                var gsc = this,
                    deferred = $q.defer();
                count = count || 8;
                SC.initialize({
                    client_id: 'b2d19575a677c201c6d23c39e408927a'
                }).get('/resolve', {
                    url: url,
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
