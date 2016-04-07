(function(){
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  UserController.$inject = ['$log', '$http', 'tokenService'];

  function UserController($log, $http, tokenService) {
    var vm = this;
    vm.users;

    vm.getUsers = getUsers;
    vm.userInfo;
    vm.setUser = setUser;
    vm.clearUser = clearUser;
    vm.followUser = followUser;

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

    function followUser(data){
      $log.info(data);
      $http({
        method: 'PUT',
        url: 'api/users/follow',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res) {

        $log.info('FOLLOWING: ', res.data.following)
      },
      function(err) {
        $log.info('WHATS HAPPENING ', err);
      });
    }

  };

})();
