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

    function showMovie(movie) {
      vm.selectedMovie = movie;
      $log.info(vm.selectedMovie)
    }

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
        $log.info('POPULATIN');
      }
    },
    function(err) {
      $log.info('error: so sad', err);
    });

    vm.addMovie = addMovie;

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
