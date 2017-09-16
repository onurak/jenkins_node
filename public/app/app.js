'use strict';
var app = angular.module('adminApp',[
  'ngResource',
  'ngCookies',
  'adminApp.interceptors.authentication',
  'adminApp.services.apps',
  'adminApp.services.authentication',
  'adminApp.services.deploys',
  'adminApp.services.servers',
  'adminApp.services.jenkins',
  'ngMaterial', 
  'ngMessages', 
  'material.svgAssetsCache',
  'ui.router',
  //'localization',
  'material.svgAssetsCache',
  'ngSanitize',
  'ngStorage',
  'mdDataTable']);


app.run(
  ['$rootScope', '$state', '$stateParams', '$cookies', '$q', '$window', '$location', '$injector',
    function ($rootScope,   $state,   $stateParams, $cookies, $q, $window, $location, $injector) {

      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;

      $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

        console.log(toState.name);
        var isLogin = toState.name === 'admin.login';
        if(isLogin){

            if($window.sessionStorage.token) {
                $window.location = '/servers';
            }
           return; 
        }

        if ($window.sessionStorage.token === undefined || $window.sessionStorage.token == null || $window.sessionStorage.token == '') {
          $window.location = '/login';
        }
      });
    }
  ]
)
.config(
  ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider', '$mdDateLocaleProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdDateLocaleProvider, $httpProvider) {

  $httpProvider.interceptors.push('authenticationInterceptor');

  $urlRouterProvider.otherwise('login');
  $locationProvider.html5Mode(true);
  $locationProvider.hashPrefix = '!';

  $mdThemingProvider.setDefaultTheme('docs-dark');
  $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow').dark();

  $stateProvider
      .state('admin', {
          url: '',
          templateUrl: '/views/partials/admin.html',
          controller: 'AdminController',
      })
      .state('admin.login', {
          url: '/login',
          templateUrl: '/views/partials/login.html',
          controller: 'LoginController',
      })
      .state('admin.apps', {
          url: '/apps',
          templateUrl: '/views/partials/apps.html',
          controller: 'AppsController'
      })
      .state('admin.servers', {
          url: '/servers',
          templateUrl: '/views/partials/servers.html',
          controller: 'ServersController'
      })
      .state('admin.deploys', {
          url: '/deploys',
          templateUrl: '/views/partials/deploys.html',
          controller: 'DeploysController'
      });
        
}]);


