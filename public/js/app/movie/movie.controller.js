(function(){
  'use strict';

  angular
    .module('app')
    .controller('MovieController', MovieController);

  MovieController.$inject = ['$log', '$http', 'authService', 'tokenService'];

  function MovieController($log, $http, authService, tokenService){
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
    vm.addFavorites   = addFavorites;
    vm.addUnwatched   = addUnwatched;

    vm.getMovieImages = getMovieImages;
    vm.getCurrentUser = getCurrentUser;
    vm.currentUser;

    vm.removeWatched = removeWatched;
    vm.removeUnwatched = removeUnwatched;
    vm.removeFavorites = removeFavorites

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
        vm.currentUser = res.data;
      },
      function(err) {
        $log.info("ERR:", err);
      });
    }


    function showMovie(movie) {
      vm.selectedMovie = movie;
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
        }
      },
      function(err) {
        $log.info('error: so sad', err);
      });
    }

    // function getMostPopularMovies(data){
      $http({
        method: 'GET',
        url: `/api/movies/search?type=popular&sort_by=popularity.desc`,
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
        url: 'api/users/watchedmovies',
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
          if (res.data.results) {
            vm.movieImages = res.data.results;
          }
        },
        function(err) {
          $log.info('ERROR', err);
        });
    }

    function removeWatched(movie, index){
      $http({
        method: 'DELETE',
        url: 'api/users/watchedmovies',
        data: movie,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        vm.currentUser.watchedMovies.splice(index, 1);
      },
      function(err) {
        $log.info("ERROR:", err);
      });
    }

    function removeUnwatched(movie, index){
      $http({
        method: 'DELETE',
        url: 'api/users/unwatched',
        data: movie,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        vm.currentUser.unwatchedMovies.splice(index, 1);
      },
      function(err) {
        $log.info("ERROR:", err);
      });
    }

    function removeFavorites(movie, index){
      $http({
        method: 'DELETE',
        url: 'api/users/favorites',
        data: movie,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        vm.currentUser.favoriteMovies.splice(index, 1);
      },
      function(err) {
        $log.info("ERROR:", err);
      });
    }

  }


})();
