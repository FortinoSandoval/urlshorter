(function() {
  'use strict';

  angular.module('app').config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
      url: '/:course',
      component: 'home',
    });

    $urlRouterProvider.otherwise('/');
  }

})();
