(function(){
  'use strict';

  angular
    .module('app')
    .config(appRoutes);

  appRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

  function appRoutes($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('landing', {
        url: '/landing',
        templateUrl: '/js/app/layouts/landing.html'
      })
    $stateProvider
      .state('signin', {
        url: '/signin',
        templateUrl: '/js/app/layouts/signin.html',
        controller: 'SignInController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
