(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log', '$http', '$window', 'authService', 'userService'];

  function SignInController($log, $http, $window, authService, userService) {

    $log.info('SignInController loaded');

    var vm = this;
    vm.signUp = signUp;
    vm.users = [];
    vm.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };

    vm.logIn = {
      email: "",
      password: ""
    }

    vm.submitLogIn = submitLogIn;

    function signUp(){
      userService.createUser(vm.user)
    }


    function submitLogIn(){
      authService.logIn(vm.logIn);
    }


  }

})();
