angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

      .state('welcome', {
        url: '/welcome',
        templateUrl: 'templates/auth/welcome/welcome.html',
        controller: 'welcomeCtrl'
      })

      // Admin
      .state('menu', {
        url: '/admin',
        templateUrl: 'templates/admin/menu.html',
        controller: 'menuCtrl'
      })

      .state('menu.berandaAdmin', {
        url: '/berandaAdmin',
        views: {
          'menu': {
            templateUrl: 'templates/admin/beranda/beranda.html',
            controller: 'berandaAdminCtrl'
          }
        }
      })

    $urlRouterProvider.otherwise('/welcome')


  });
