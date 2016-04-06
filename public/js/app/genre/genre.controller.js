(function(){
  'use strict';

  angular
    .module('app')
    .controller('GenreController', GenreController);

  GenreController.$inject = ['$log', '$http', 'authService', 'tokenService'];

  function GenreController($log, $http, authService, tokenService){
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
    vm.showMovie = showMovie;
    vm.selectedMovie = {};

    vm.addMovie = addMovie;
    vm.watchedMovies = authService.currentUser().watchedMovies;
    vm.addFavorites = addFavorites;
    vm.favoriteMovies = authService.currentUser().favoriteMovies;

    vm.getMovieImages = getMovieImages;

    function showMovie(movie) {
      vm.selectedMovie = movie;
      $log.info(vm.selectedMovie)
    }

    function showGenre(name, page) {
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


    $http({
      method: 'GET',
      url: `/api/movies/search?type=popular&sory_by=popularity.desc`,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(res){
      if (res.data.results) {
        vm.movieInfoByPopularity = res.data.results;
      }
    },
    function(err) {
      $log.info('error: so sad', err);
    });

    function addMovie(data){
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
          $log.info('SUCCESSSSSS: ', res)
          if (res.data.watchedMovies) {
          vm.watchedMovies = res.data.watchedMovies;
          $log.info("added to watched movies", vm.watchedMovies);
          }
        },
        function(err) {
          $log.info('error ', err);
      });
    }

    function addFavorites(data){
      $http({
        method: 'PUT',
        url: 'api/users/' + authService.currentUser()._id + '/favorites',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(
        function(res) {
          $log.info('added to favorites: ', res)
          if (res.data.favoriteMovies) {
          vm.favoriteMovies = res.data.favoriteMovies;
          $log.info("logging watchedMovies", vm.favoriteMovies);
          }
        },
        function(err) {
          $log.info('error ', err);
      });
    }

    function getMovieImages(id){
      $http({
        method: 'GET',
        url: 'api/images/' + id,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          $log.info('COOOOOOOOL', res.data.results)
          if (res.data.results) {
            vm.movieImages = res.data.results;
          }
        },
        function(err) {
          $log.info('ERROR', err);
        });
    }

  }


})();
