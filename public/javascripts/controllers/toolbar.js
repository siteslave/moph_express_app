
angular.module('app.controllers.Toolbar', [])
  .controller('ToolbarCtrl', function ($scope, $mdSidenav) {
  
    $scope.toggleLeft = () => {
      $mdSidenav('left')
        .toggle();
    };

  $scope.openMenu = ($mdOpenMenu, ev) => {
    $mdOpenMenu(ev);
  };
    
})