
angular.module('app.services.Members', [])
  .factory('MemberService', function ($http) {
    return {
      getList: function () {
        return $http.get('/admin/members');
      }
    }
  });