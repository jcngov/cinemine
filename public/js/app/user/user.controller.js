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
    vm.followingList;
    vm.setUser = setUser;
    vm.clearUser = clearUser;
    vm.followUser = followUser;
    vm.getfollowingUser = getfollowingUser;

    getUsers();


    function getUser(user){
      $http({
        method: 'GET',
        url: '/api/users/' + user._id,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        vm.user = res.data;
      },
      function(err) {
        $log.info("ERR:", err);
      });
    }

    function getfollowingUser(user) {
      $http({
        method: 'GET',
        url: '/api/users/' + user,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res){
        vm.user = res.data;
      },
      function(err) {
        $log.info("ERR:", err);
      });
    }

    function getUsers(){
      $http({
        method: 'GET',
        url: 'api/users',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(function(res){
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
    }

    function clearUser(){
      vm.userInfo = undefined;
    }

    function followUser(data){
      $http({
        method: 'PUT',
        url: 'api/users/me/follow',
        data: data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenService.retrieve()}`
        }
      })
      .then(function(res) {
        if (res.data) {
          vm.following = res.data.following
          $log.info("Followers:", vm.following);
        }
      },
      function(err) {
        $log.info('WHATS HAPPENING ', err);
      });
    }

  };

})();
