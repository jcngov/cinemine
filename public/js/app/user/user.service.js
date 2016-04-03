(function(){
  'use strict';

  angular
    .module('app')
    .factory('userService', userService);

  userService.$inject = ['$log', '$http', 'authService'];

  function userService($log, $http, authService) {
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
        },
        function(err){
          $log.info("Error: ", err)
        }
      );
    };
  }

})();
