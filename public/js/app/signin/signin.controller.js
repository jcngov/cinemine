(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log', '$http', '$window'];

  function SignInController($log, $http, $window) {

    $log.info('SignInController loaded');

    var vm = this;
    vm.signUp = signUp;
    vm.generateToken = generateToken;
    vm.users = [];
    vm.user = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };

    function saveToken(value, data) {
      $window.localStorage.setItem(value, data);
    }


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
          generateToken();
        },
        function(err){
          $log.info("Error: ", err)
        }
      );
    };

    function generateToken(){
      $http({
        method: 'POST',
        url: 'http://localhost:3000/api/token',
        data: {
          email: vm.user.email,
          password: vm.user.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        function(res) {
          $log.info('Success: ', res.data);
          var token = res.data;
          $log.info(token);
          saveToken('token', token);
        },
        function(err) {$log.info('Error', err);}
      );
    }
  }

})();
