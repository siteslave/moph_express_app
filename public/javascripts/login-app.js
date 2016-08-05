
angular.module('app', ['ngMaterial'])
  .config(function ($mdThemingProvider) { 

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  })  
  .controller('LoginCtrl', function ($scope) {
  
  });