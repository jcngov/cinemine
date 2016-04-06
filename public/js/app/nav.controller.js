(function(){
  'use strict';

  angular
    .module('app')
    .controller('NavController', NavController);

  NavController.$inject = ['$log', 'authService', '$state'];

  function NavController($log, authService, $state){
    // $log.info('NavController loaded')

    var vm = this;
    vm.logOut = logOut;
    vm.currentUser = {
      firstName: authService.currentUser().firstName,
      email: authService.currentUser().email
    };

    function logOut() {
      authService.logOut();
      $state.go('landing');
    }

  }

})();
