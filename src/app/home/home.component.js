(function () {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($state, $http, $scope, $interval, $location, $window) {
    $scope.courseId = $location.search().course;
    $location.search('course', null)
    if (!$scope.courseId) {
      window.location = 'http://techcoursesite.com';
      return;
    }
    $scope.apiUrl = ''
    $scope.secondsLeft = 10;
    $scope.isProd = location.hostname !== 'localhost';
    if (location.hostname === 'localhost') {
      if (location.port !== '4000') {
        $scope.apiUrl = 'http://shrinker.techcoursesite.com';
      }
    }

    $http.post(`${$scope.apiUrl}/getcourse/${$scope.courseId}`, {}, {responseType:'arraybuffer'}).then((res) => {
      var blob = new Blob([res.data], { type: "application/octet-stream" });
      
      var url = window.URL || window.webkitURL;
      $scope.downloadLink = angular.element('<a></a>');
      $scope.downloadLink.attr('href',url.createObjectURL(blob));
      $scope.downloadLink.attr('target','_self');
      $scope.downloadLink.attr('download', atob($scope.courseId) + '.torrent');
    }).catch(err => {
      console.log(err);
    });

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
      if ($scope.secondsLeft > 0 || $scope.downloaded) return;
      $scope.downloadLink[0].click();
      $scope.downloaded = true;
    };

  }

})();
