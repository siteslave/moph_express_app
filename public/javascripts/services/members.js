
angular.module('app.services.Members', [])
  .factory('MemberService', function ($http) {
    return {
      getList: function (limit, offset) {
        return $http.get(`/admin/members?limit=${limit}&offset=${offset}`);
      },
      getTotal: function () {
        return $http.get('/admin/members/total');
      },
      getGroups: function () {
        return $http.get('/admin/groups');
      },
      save: function (member) {
        return $http.post('/admin/members', { member: member });
      },
      search: function (query) {
        return $http.get('/admin/members/search?query=' + query);
      }

    }
  });