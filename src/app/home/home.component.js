(function () {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($state, $http, $scope, $interval) {
    $scope.courseId = $state.params.course;
    $scope.apiUrl = ''
    $scope.secondsLeft = 10;
    $scope.isProd = location.hostname !== 'localhost';
    if (location.hostname === 'localhost' && location.port !== '4000') {
      $scope.apiUrl = 'http://shrinker.techcoursesite.com';
    }

    $scope.generateLink = () => {
      $scope.generateLinkClicked = true;
      setTimeout(() => {
        const interval = $interval(() => {
          $scope.secondsLeft -= 1;
          if ($scope.secondsLeft === 0) {
            $interval.cancel(interval);
          }
        }, 1000)
      }, 800)
    };

    $scope.downloadFile = () => {
      if ($scope.secondsLeft > 0) return;
      console.log('downloaded');
    };

  }

})();
