
angular.module('app.services.Members', [])
  .factory('MemberService', function ($http) {
    return {
      getList: function () {
        return $http.get('/admin/members');
      },
      getGroups: function () {
        return $http.get('/admin/groups');
      }
    }
  });