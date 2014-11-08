angular.
 module('soundcloud', []).
 factory('getSoundcloud', function($http, $log, $q) {
   return {
      
            getUrl: function(url, callback){
               var gsc = this;
               $http.get('http://api.soundcloud.com/resolve', {
                  params: {
                     url: url || 'http://soundcloud.com/byutifu/tracks',
                     client_id: 'b2d19575a677c201c6d23c39e408927a',
                     format: 'json',
                     '_status_code_map[302]':'200'
                  }
               }).success(function(result) {
                  console.log(result);
                  return gsc.getTracks(result.data.location, callback);
               });
            },
            getTracks: function(url, callback) {
               var deferred = $q.defer();
               $http.get(url || getUrl(url), {
                      params: {
                         limit: 8,
                         client_id: 'b2d19575a677c201c6d23c39e408927a',
                         format: 'json',
                         '_status_code_map[302]':'200'
                      }
                  }).success(function(result) {
                  //resolve the promise as the data
                  var output = [],
                     track = result;
                  console.log(track);
                  track = track.slice(0, 8);
                  angular.forEach(track, function(v, k) {
                      console.log(v);
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
                  if (callback) {
                     callback();
                  }
                  deferred.resolve(output);
               });
               console.log(deferred.promise);
               return deferred.promise;
            }
         
   }
}).controller('controlSoundCloud', function($scope, getSoundcloud) {
    getSoundcloud.getTracks().then(function(tracks) {
        $scope.soundcloud = tracks;
    });
});;
