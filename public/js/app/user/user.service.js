(function(){
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$log', '$http', 'authService', '$state'];

  function userService($log, $http, authService, $state) {

    var service = {
      createUser: createUser
    }

    return service;

    function createUser(data) {
      var promise = $http({
        method: 'POST',
        url: '/api/users',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return promise;
    }
  }

})();
