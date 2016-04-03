(function(){
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$log', '$http', 'authService', '$state'];

  function userService($log, $http, authService, $state) {
    $log.info('userService loaded')

    var service = {
      createUser: createUser
    }

    return service;

    function createUser(data) {
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          $log.info("Success ", res)
          authService.logIn(data);
        })
      .then(
        function(decodedToken){
          $state.go('home');
        },
        function(err) {
          $log.info('Error: ', err);
        }
      );
    }
  }

})();
