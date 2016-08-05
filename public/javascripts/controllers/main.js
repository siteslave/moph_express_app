
angular.module('app.controllers.Main', [])
  .controller('MainCtrl', function ($scope, MemberService, $mdDialog) {
    // Main ctrl
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

    $scope.showAddMember = function () {

      $mdDialog.show({
        controller: 'AddMemberDialogCtrl',
        templateUrl: '/partials/dialog/add-member',
        parent: angular.element(document.body),
        // targetEvent: event,
        clickOutsideToClose: false,
        fullscreen: false
      })
        .then(function () {
          
        }, function () {
          //
        });

    };


    $scope.getList();
    
  });