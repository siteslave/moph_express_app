
angular.module('app', ['ngMaterial', 'ui.router','app.controllers.SideNav','app.controllers.Toolbar'])
  .config(function ($mdThemingProvider) { 

    $mdThemingProvider.theme('default')
      .primaryPalette('pink')
      .accentPalette('orange');
  })