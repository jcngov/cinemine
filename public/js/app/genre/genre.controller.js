(function(){
  'use strict';

  angular
    .module('app')
    .controller('GenreController', GenreController);

  GenreController.$inject = ['$log', '$http'];

  function GenreController($log, $http){
    $log.info('GenreController loaded')
    var vm = this;

    vm.genres = [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "Foreign",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Science Fiction",
      "TV Movie",
      "Thriller",
      "War",
      "Western"
    ];

    vm.showGenre = showGenre;

    vm.searchByTitle = searchByTitle;

    function showGenre(name, page) {
      $log.info("RUNNING SHOW GENRE")
      $http({
        method: 'GET',
        url:    `/api/movies/search?type=genre&query=${name}&page=${page}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res){
          if (res.data.results) {
            vm.movieInfo = res.data.results;
          }
        },
        function(err) {
          $log.info('error: so sad', err);
        }
      );
    }


    function searchByTitle(title, page){
      $http({
        method: 'GET',
        url: `/api/movies/search?type=title&query=${vm.title}&page=${page}`,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        if (res.data.results) {
          vm.movieInfoByTitle = res.data.results;
          $log.info('SEARCHIN');
          $log.info(vm.movieInfoByTitle);
        }
      },
      function(err) {
        $log.info('error: so sad', err);
      });
    }

  }


})();
