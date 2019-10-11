(function () {
  'use strict';

  angular.module('app').component('home', {
    controller: HomeController,
    templateUrl: 'app/home/home.view.html',
  });

  /** @ngInject */
  function HomeController($state, $http, $scope, $interval, $location, $window) {
    $scope.courseId = $location.search().course;
    if (!$scope.courseId) {
      window.location = 'http://techcoursesite.com';
      return;
    }
    $scope.apiUrl = ''
    $scope.secondsLeft = 10;
    $scope.isProd = location.hostname !== 'localhost';
    if (location.hostname === 'localhost' && location.port !== '4000') {
      $scope.apiUrl = 'http://shrinker.techcoursesite.com';
    }

    $http.get(`http://localhost:4000/getcourse/${btoa($scope.courseId)}`, {responseType:'blob'}).then((res) => {
      var blob = new Blob([res.data], { type: "application/octet-stream" });
      
      const url = $window.URL || $window.webkitURL;
  $scope.fileUrl = url.createObjectURL(blob);

    
    
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
      if ($scope.secondsLeft > 0) return;
      console.log('downloaded');
    };

  }

})();
