(function(){
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

  appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: '/js/app/layouts/landing.html'
      })
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: '/js/app/layouts/signin.html',
        controller: 'SignInController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/js/app/layouts/home.html'
      })
    $stateProvider
      .state('browse', {
        url: '/browse',
        templateUrl: '/js/app/layouts/browse.html'
      })
    $stateProvider
      .state('genre', {
        url: "/genre",
        templateUrl: 'js/app/layouts/genre.html',
        controller: 'MovieController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('genre.movie', {
        url: '/movie/:movieTitle',
        templateUrl: 'js/app/layouts/show.movie.html'
      })
    $stateProvider
      .state('title', {
        url: '/browse/title',
        templateUrl: 'js/app/layouts/title.html',
        controller: 'MovieController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('title.movie', {
        url: '/movie/:movieTitle',
        templateUrl: 'js/app/layouts/show.movie.html'
      })
    $stateProvider
      .state('rating', {
        url: '/browse/rating',
        templateUrl: 'js/app/layouts/rating.html',
        controller: 'MovieController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('rating.movie', {
        url: '/movie/:movieTitle',
        templateUrl: 'js/app/layouts/show.movie.html'
      })
    $stateProvider
      .state('moviebank', {
        url: '/moviebank',
        templateUrl: 'js/app/layouts/moviebank.html'
      })
    $stateProvider
      .state('mymovies', {
        url: '/mymovies',
        templateUrl: 'js/app/layouts/mymovies.html'
      })
    $stateProvider
      .state('moviebuffs', {
        url: '/moviebuffs',
        templateUrl: 'js/app/layouts/moviebuffs.html',
        controller: 'UserController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('moviebuffs.following', {
        url: '/following',
        templateUrl: 'js/app/layouts/following.html'
      })
    $stateProvider
      .state('mymovies.movie', {
        url: '/movie',
        templateUrl: 'js/app/layouts/show.movie.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
