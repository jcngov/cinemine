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
          {
            "id": 28,
            "name": "Action"
          },
          {
            "id": 12,
            "name": "Adventure"
          },
          {
            "id": 16,
            "name": "Animation"
          },
          {
            "id": 35,
            "name": "Comedy"
          },
          {
            "id": 80,
            "name": "Crime"
          },
          {
            "id": 99,
            "name": "Documentary"
          },
          {
            "id": 18,
            "name": "Drama"
          },
          {
            "id": 10751,
            "name": "Family"
          },
          {
            "id": 14,
            "name": "Fantasy"
          },
          {
            "id": 10769,
            "name": "Foreign"
          },
          {
            "id": 36,
            "name": "History"
          },
          {
            "id": 27,
            "name": "Horror"
          },
          {
            "id": 10402,
            "name": "Music"
          },
          {
            "id": 9648,
            "name": "Mystery"
          },
          {
            "id": 10749,
            "name": "Romance"
          },
          {
            "id": 878,
            "name": "Science Fiction"
          },
          {
            "id": 10770,
            "name": "TV Movie"
          },
          {
            "id": 53,
            "name": "Thriller"
          },
          {
            "id": 10752,
            "name": "War"
          },
          {
            "id": 37,
            "name": "Western"
          }
    ]

    vm.genres.forEach(function(genre) {
      vm.genreList = genre.name;
      return vm.genreList;
    })

    // vm.movieInfo = {
    //   title = vm.movieInfo.title,
    //   overview = vm.movieInfo.overview,
    //   backdrop_path = vm.movieInfo.backdrop_path,
    //   release_date = vm.movieInfo.release_date,
    //   poster_path = vm.movieInfo.poster_path,
    //   popularity = vm.movieInfo.popularity
    // }

    $http({
      method: 'GET',
      url: '/api/actionmovies',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(function(res){
      if (res.data) {
        vm.movieInfo = res.data;
      }
    },
    function(err) {
      $log.info('error: so sad', err);
    });

  }


})();
