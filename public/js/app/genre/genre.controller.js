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

    // vm.genres.forEach(function(genre) {
    //   vm.genreList = genre.name;
    //   return vm.genreList;
    // })

    // vm.getActionMovies = getActionMovies;
    vm.searchByTitle = searchByTitle;

    // vm.movieInfo = {
    //   title = vm.movieInfo.title,
    //   overview = vm.movieInfo.overview,
    //   backdrop_path = vm.movieInfo.backdrop_path,
    //   release_date = vm.movieInfo.release_date,
    //   poster_path = vm.movieInfo.poster_path,
    //   popularity = vm.movieInfo.popularity
    // }

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


    function searchByTitle(){
      $http({
        method: 'GET',
        url: '/api/moviebytitle',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        if (res.data) {
          vm.movieTitle = res.data;
        }
      },
      function(err) {
        $log.info('error: so sad', err);
      });
    }

  }


})();
