angular.module('app.controllers.AddMemberDialog', [])

  .controller('AddMemberDialogCtrl', function ($scope, $rootScope,
    $mdDialog, MemberService) {

    $scope.member = {};
    $scope.groups = [];

    // get groups
    MemberService.getGroups()
      .success(function (data) {
        if (data.ok) {
          $scope.groups = data.rows;
        }
      })
      .error(function () {
        console.log('Conection failed!')
      });

    $scope.cancel = function () {
      $mdDialog.cancel();
    }

    $scope.save = function () {

      MemberService.save($scope.member)
        .then(function () {
          $mdDialog.hide();
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('ผลการบันทึก')
              .textContent('บันทึกข้อมูลเรียบร้อยแล้ว')
              .ariaLabel('alert')
              .ok('ตกลง')
          );
          
        }, function (err) {
          console.log(err);
          $mdDialog.show(
            $mdDialog.alert()
              .clickOutsideToClose(true)
              .title('ผลการบันทึก')
              .textContent('ไม่สามารถบันทึกได้')
              .ariaLabel('alert')
              .ok('ตกลง')
          );
        });
    }

  });
