(function(){
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['$log', '$http', '$window'];

  function authService($log, $http, $window){
    $log.info('authService loaded')

    var service = {
      logIn: logIn
    }

    return service;

    function saveToken(value, data) {
      $window.localStorage.setItem(value, data);
    }

    function logIn(data){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/token',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          $log.info('Success: ', res.data);
          var token = res.data;
          $log.info(token);
          saveToken('token', token);
        },
        function(err) {$log.info('Error', err);}
      );
    }
  }

})();
