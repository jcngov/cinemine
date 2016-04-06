(function(){
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['$log', '$http'];

  function UserController($log, $http) {
    var vm = this;
    vm.users;

    vm.getUsers = getUsers;
    vm.userInfo;
    vm.setUser = setUser;
    vm.clearUser = clearUser;

    getUsers();
    function getUsers(){
      $http({
        method: 'GET',
        url: 'api/users',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
        $log.info("USER STUFF: ", res.data.data)

        if (res.data) {
          vm.users = res.data.data;
        }
      },
      function(err){
        $log.info('ERROR: ', err);
      });
    }

    function setUser(user){
      vm.userInfo = user;
      $log.info(vm.userInfo);
    }

    function clearUser(){
      vm.userInfo = undefined;
    }

  };

})();
