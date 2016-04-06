(function(){
  'use strict';

  angular
    .module('app')
    .controller('MovieController', MovieController);

  MovieController.$inject = ['$log', '$http', 'authService', 'tokenService'];

  function MovieController($log, $http, authService, tokenService){
    $log.info('MovieController loaded')
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

    vm.showGenre      = showGenre;
    vm.searchByTitle  = searchByTitle;
    vm.showMovie      = showMovie;
    vm.selectedMovie  = {};
    vm.addMovie       = addMovie;
    // vm.watchedMovies  = authService.currentUser().watchedMovies;
    vm.addFavorites   = addFavorites;
    vm.addUnwatched   = addUnwatched;
    // vm.favoriteMovies = authService.currentUser().favoriteMovies;
    vm.getMovieImages = getMovieImages;
    vm.getCurrentUser = getCurrentUser;
    vm.currentUser;
    // vm.getMostPopularMovies = getMostPopularMovies;
    getCurrentUser();

    function getCurrentUser(){
      $http({
        method: 'GET',
        url: '/api/users/me',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        $log.info("USER:", res);
        vm.currentUser = res.data;
        $log.info("CURRENTINFO", vm.currentUser);
      },
      function(err) {
        $log.info("ERR:", err);
      });
    }


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

    // function getMostPopularMovies(data){
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
    // }


    function addMovie(data){
      $http({
        method: 'PUT',
        url: 'api/users/movielist',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(
        function(res) {
          if (res.data.watchedMovies) {
          getCurrentUser();
          $log.info(vm.currentUser);
          $log.info("added to watched movies", vm.currentUser.watchedMovies);
          }
        },
        function(err) {
          $log.info('error ', err);
      });
    }

    function addFavorites(data){
      $http({
        method: 'PUT',
        url: 'api/users/favorites',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(
        function(res) {
          if (res.data.favoriteMovies) {
          getCurrentUser();
          $log.info("added to Favorites", vm.currentUser.favoriteMovies);
          }
        },
        function(err) {
          $log.info('error ', err);
      });
    }

    function addUnwatched(data){
      $http({
        method: 'PUT',
        url: 'api/users/unwatched',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(
        function(res) {
          if (res.data.unwatchedMovies) {
          getCurrentUser();
          $log.info("added to movie bank", vm.currentUser.unwatchedMovies);
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
