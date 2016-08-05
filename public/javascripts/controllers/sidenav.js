
angular.module('app.controllers.SideNav', [])
  .controller('SideNavCtrl', function ($scope, $mdSidenav, $state) {
  
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.go = (state) => {
      $state.go(state);
    };

    
  });