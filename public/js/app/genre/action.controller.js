(function(){
  'use strict';

  angular
    .module('app')
    .controller('ActionGenreController', ActionGenreController);

  ActionGenreController.$inject = ['$log', '$http'];

  function ActionGenreController($log, $http) {
    $log.info('ActionGenreController loaded')

    var vm = this;

    vm.movieInfo = {};
    vm.movieInfo.title = movie.title;
    vm.movieInfo.overview = movie.overview;
    vm.movieInfo.backdrop_path = movie.backdrop_path;
    vm.movieInfo.release_date = movie.release_date;
    vm.movieInfo.poster_path = movie.poster_path;
    vm.movieInfo.popularity = movie.popularity;

    vm.hi = 'hi';
    $http({
      method: 'GET',
      url: '/api/movies',
      data: vm.movieInfo,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(success){
      $log.info("succes: successfulll", success);
    },
    function(err) {
      $log.info('error: so sad', err);
    });
  }

})();
