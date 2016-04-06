(function(){
  'use strict';

  angular
    .module('app')
    .controller('MovieListController', MovieListController);

  MovieListController.$inject = ['$log', '$http', 'authService', 'tokenService'];

  function MovieListController($log, $http, authService, tokenService) {
    $log.info("MovieListController loaded");
    var vm = this;
    vm.addMovie = addMovie;
    // $log.info(authService.currentUser()._id);
    $log.info(tokenService.retrieve());
    function addMovie(data){
    $log.info("HELP", data);
      $http({
        method: 'PUT',
        url: 'api/users/' + authService.currentUser()._id + '/movielist',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(
        function(res) {
          $log.info('success: ', res.data)
        },
        function(err) {
          $log.info('error ', err);
      });
    }

  }


})();
