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
        templateUrl: '/js/app/layouts/home.html',
        controller: 'NavController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('browse', {
        url: '/browse',
        templateUrl: '/js/app/layouts/browse.html'
      })
    $stateProvider
      .state('genre', {
        templateUrl: 'js/app/layouts/genre.html',
        controller: 'GenreController',
        controllerAs: 'vm'
      })
    $stateProvider
      .state('movie', {
        url: '/movie/:movieTitle',
        templateUrl: 'js/app/layouts/show.movie.html'
      })
    $stateProvider
      .state('title', {
        url: '/browse/title',
        templateUrl: 'js/app/layouts/title.html'
      })
    $stateProvider
      .state('rating', {
        url: '/browse/rating',
        templateUrl: 'js/app/layouts/rating.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
