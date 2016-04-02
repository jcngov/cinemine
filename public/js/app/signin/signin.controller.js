(function(){
  'use strict';

  angular
    .module('app')
    .controller('SignInController', SignInController);

  SignInController.$inject = ['$log'];

  function SignInController($log) {

    var vm = this;
    $log.info('SignInController loaded');

  }

})();
