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
        templateUrl: '../index.html'
      })
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: '/js/app/layouts/signin.html'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
