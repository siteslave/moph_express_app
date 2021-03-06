
angular.module('app.controllers.Main', [])
  .controller('MainCtrl', function ($scope, MemberService, $mdDialog) {
    // Main ctrl

    $scope.showPaging = true;    
    $scope.search = {};

    $scope.doSearch = function () {
      if ($scope.search.query.length >= 2) {
        $scope.showPaging = false;
        $scope.showLoading = true;

        MemberService.search($scope.search.query)
          .success(function (data) {
            $scope.members = data.rows;
            $scope.showLoading = false;
          })
          .error(function () {
            console.log('Connection failed!')
            $scope.showLoading = false;
          });
      }
    }

    $scope.getList = function (limit, offset) {
      $scope.showLoading = true;
      $scope.showPaging = true;

      MemberService.getList(limit, offset)
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

    $scope.total = 0;
    
    // Paging
    $scope.query = {
      limit: 10,
      page: 1
    };

    $scope.onPaginate = function (page, limit) {
      var offset = (page - 1) * limit;
      $scope.getList(limit, offset);
    }

    $scope.getTotal = function () {
      MemberService.getTotal()
        .success(function (data) {
          $scope.total = data.total;
        })
        .error(function () {

        });
    }

    $scope.initialData = function () {
      var limit = $scope.query.limit;
      var offset = ($scope.query.page - 1) * $scope.query.limit;

      $scope.getTotal();
      $scope.getList(limit, offset);
    };
    
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
          $scope.initialData();
        }, function () {
          //
        });

    };


    $scope.initialData();
    
  });