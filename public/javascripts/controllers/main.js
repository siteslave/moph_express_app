
angular.module('app.controllers.Main', [])
  .controller('MainCtrl', function ($scope, MemberService) {
  
    $scope.getList = function () {
      $scope.showLoading = true;

      MemberService.getList()
        .success(function (data) {
          if (data.ok) {
            $scope.members = data.rows;
          } else {
            alert(JSON.stringify(data.msg))
          }

          $scope.showLoading = false;
        })
        .error(function () {
          console.log('Connection failed!')
          $scope.showLoading = false;
        });
    }


    $scope.getList();
    
  });