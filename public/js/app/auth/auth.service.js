(function(){
  'use strict';

  angular
    .module('app')
    .factory('authService', authService);

  authService.$inject = ['$log', '$http', '$window', 'tokenService'];

  function authService($log, $http, $window, tokenService){
    $log.info('authService loaded')

    var service = {
      logIn: logIn,
      logOut: logOut
    }

    return service;

    // function saveToken(value, data) {
    //   $window.localStorage.setItem(value, data);
    // }

    function logIn(data){
      var promise = $http({
        method: 'POST',
        url: 'http://localhost:3000/api/token',
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          // $log.info('Success: ', res.data);
          var token = res.data;
          // $log.info(token);
          tokenService.store(token);
          $log.info('Success: ', tokenService.decode());
          return tokenService.decode();
        }
      );
      return promise;
    }

    function logOut(){
      tokenService.destroy();
      $log.info('logged out');
    }
  }

})();
