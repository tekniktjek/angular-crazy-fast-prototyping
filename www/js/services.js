angular.module('starter.services', ['firebase'])

/**
 * A simple example service that returns some data.
 */
.service('Friends', function($firebaseArray, store, $state) {

  var friendsRef = new Firebase("https://angularu2015.firebaseio.com/friends");
  friendsRef.authWithCustomToken(store.get('firebaseToken'), function(error, auth) {
    if (error) {
      // There was an error logging in, redirect the user to login page
      $state.go('login');
    }
  });

  var friends = $firebaseArray(friendsRef);

  this.all = function() {
    return friends;
  };

  this.add = function(friend) {
    friends.$add(friend);
  };

  this.get = function(id) {
    return friends.$getRecord(id);
  };

  this.save = function(friend) {
    friends.$save(friend);
  };

  this.delete = function(friend) {
    friends.$remove(friend);
  };

})
.factory('Camera', ['$q', function($q) {


  return {
    
    getPicture: function(options) {
      var q = $q.defer();
      if(navigator.camera != undefined){
        navigator.camera.getPicture(function(result) {
          q.resolve(result);
        }, function(err) {
          q.reject(err);
        }, options);
      }else{
        q.reject(false);
      }

      return q.promise;
    }
  };
}]);
