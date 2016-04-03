(function(){
  'use strict';

  angular
    .module('app')
    .controller('NavController', NavController);

  NavController.$inject = ['$log', 'authService', '$state'];

  function NavController($log, authService, $state){
    $log.info('NavController loaded')

    var vm = this;
    vm.logOut = logOut;

    function logOut() {
      authService.logOut();
      $state.go('landing');
    }

  }

})();
