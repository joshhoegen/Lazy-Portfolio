angular.module('instagram', []).
    factory('getInstagram', function($http, $log, $q) {
        return {    
            getImages: function(count){
                var deferred = $q.defer(),
                    // Add to open-conf.json
                    account = account = {
                        'access_token': '585198746.afb223f.7e34424d217343098ac6974ed1628216',
                        'user': {
                          'username': 'joshhoegen',
                          'bio': '',
                          'website': 'http:\/\/127.0.0.1:8000',
                          'profile_picture': 'http:\/\/distilleryimage10.ak.instagram.com\/06cb29062c2f11e387d622000aeb0b75_7.jpg',
                          'full_name': 'Joshua Hoegen',
                          'id': '585198746'
                        }
                    };

                var cacheImage, output = {},
                    request = $http.jsonp('https://api.instagram.com/v1/users/' + account.user.id + '/media/recent?access_token=' + account.access_token + '&count=' + (count || 10) + '&callback=JSON_CALLBACK')
                        .success(function(data, status, headers) {
                            console.log(data);
                             deferred.resolve(data);
                        });
                return deferred.promise;
            }
        }
    });