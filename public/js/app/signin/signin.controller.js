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

    vm.conflict = false;
    vm.unprocessable = false;
    vm.unprocessableSignUp = false;
    vm.notFound = false;


    function signUp(){
      userService.createUser(vm.user)
      .then(
      function(res) {
        $log.info("Success ", res)
        return authService.logIn(vm.user)
      })
      .then(
        function(decodedToken){
          $state.go('home');
        },
        function(err) {
          if (err.status === 409) vm.conflict = true;
          if (err.status === 422) vm.unprocessableSignUp = true;
          $log.info('Error: ', err);
        }
      );
      vm.conflict = false;
      vm.unprocessableSignUp = false;
    }


    function submitLogIn(){
      authService
        .logIn(vm.logIn)
        .then(
          function(decodedToken){
            $state.go('home');
          },
          function(err) {
            if (err.status === 422) vm.unprocessable = true;
            if (err.status === 403) vm.notFound = true;
            $log.info('Error: ', err);
          }
        );
      vm.unprocessable = false;
      vm.notFound = false;
    }


  }

})();
