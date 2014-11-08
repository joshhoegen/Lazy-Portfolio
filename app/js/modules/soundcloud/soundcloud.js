angular.module('soundcloud', []).
   factory('getSoundcloud', function($http, $log, $q) {
      return {
         getTracks: function(url, callback) {
            var gsc = this,
               deferred = $q.defer();
            SC.initialize({
               client_id: 'b2d19575a677c201c6d23c39e408927a'
            }).get('/resolve', {
               url: url,
               limit: 8
            },function(tracks) {
               if (callback) {
                  callback();
               }
               deferred.resolve(tracks);
            });
            return deferred.promise;
         }
      }
   });
