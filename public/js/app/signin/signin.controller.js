(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log', '$http'];

  function SignInController($log, $http) {

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


    function signUp(user) {
      $log.info(user);
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/users',
        data: {
          firstName:            vm.user.firstName,
          lastName:             vm.user.lastName,
          email:                vm.user.email,
          password:             vm.user.password,
          passwordConfirmation: vm.user.passwordConfirmation
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          $log.info("Success ", res)
        },
        function(err){
          $log.info("Error: ", err)
        }
      );
    };
  }

})();
