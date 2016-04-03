(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log', '$http', '$window', 'authService', 'userService', '$state'];

  function SignInController($log, $http, $window, authService, userService, $state) {

    $log.info('SignInController loaded');

    var vm = this;
    vm.signUp = signUp;
    vm.submitLogIn = submitLogIn;
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


    function signUp(){
      userService.createUser(vm.user)
    }


    function submitLogIn(){
      authService
        .logIn(vm.logIn)
        .then(
          function(decodedToken){
            $state.go('home');
          },
          function(err) {
            $log.info('Error: ', err);
          }
        );
    }


  }

})();
