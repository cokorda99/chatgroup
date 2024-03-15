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


      .state('loginDinas', {
        url: '/loginDinas',
        templateUrl: 'templates/auth/login/loginDinas.html',
        controller: 'loginDinasCtrl'
      })

      .state('loginSekolah', {
        url: '/loginSekolah',
        templateUrl: 'templates/auth/login/loginSekolah.html',
        controller: 'loginSekolahCtrl'
      })


      .state('loginGuru', {
        url: '/loginGuru',
        templateUrl: 'templates/auth/login/loginGuru.html',
        controller: 'loginGuruCtrl'
      })

      .state('registrasiGuru', {
        url: '/registrasiGuru',
        templateUrl: 'templates/auth/registrasi/registrasiGuru.html',
        controller: 'registrasiGuruCtrl'
      })

      // Guru
      .state('menuGuru', {
        url: '/guru',
        templateUrl: 'templates/guru/menuGuru.html',
        controller: 'menuGuruCtrl'
      })

      .state('menuGuru.berandaGuru', {
        url: '/berandaGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/beranda/beranda.html',
            controller: 'berandaGuruCtrl'
          }
        }
      })

      .state('menuGuru.profilGuru', {
        url: '/profilGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/profil/profil.html',
            controller: 'profilGuruCtrl'
          }
        }
      })

      .state('menuGuru.editprofilGuru', {
        url: '/editprofilGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/profil/edit_profil.html',
            controller: 'editprofilGuruCtrl'
          }
        }
      })

      .state('menuGuru.kartuVaksinGuru', {
        url: '/kartuVaksinGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/beranda/kartuVaksin.html',
            controller: 'kartuVaksinGuruCtrl'
          }
        }
      })


      .state('menuGuru.menueditGuru', {
        url: '/menueditGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/profil/menuEdit.html',
            controller: 'menuEditGuruCtrl'
          }
        }
      })

      .state('menuGuru.editPasswordGuru', {
        url: '/editPasswordGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/profil/edit_password.html',
            controller: 'editPasswordGuruCtrl'
          }
        }
      })
      
      .state('menuGuru.UploadkartuVaksinGuru', {
        url: '/UploadkartuVaksinGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/beranda/UploadVaksin.html',
            controller: 'UploadkartuVaksinGuruCtrl'
          }
        }
      })

      .state('menuGuru.editFototProfilGuru', {
        url: '/editFototProfilGuru',
        views: {
          'menuGuru': {
            templateUrl: 'templates/guru/profil/editFotoProfil.html',
            controller: 'editFotoProfilGuruCtrl'
          }
        }
      })


      // Admin
      .state('menuAdmin', {
        url: '/admin',
        templateUrl: 'templates/admin/menuAdmin.html',
        controller: 'menuAdminCtrl'
      })

      .state('menuAdmin.berandaAdmin', {
        url: '/berandaAdmin',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/beranda.html',
            controller: 'berandaAdminCtrl'
          }
        }
      })

      .state('menuAdmin.dataPokokGuru', {
        url: '/dataPokokGuru',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/beranda2.html',
            controller: 'dataPokokGuruCtrl'
          }
        }
      })

      .state('menuAdmin.dataPegawaiDinas', {
        url: '/dataPegawaiDinas',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPegawaiDinas/dataPegawaiDinas.html',
            controller: 'dataPegawaiDinasCtrl'
          }
        }
      })


      .state('menuAdmin.dataGuru', {
        url: '/dataGuru',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataGuru/dataGuru.html',
            controller: 'dataGuruCtrl'
          }
        }
      })

      .state('menuAdmin.dataPegawaiSekolah', {
        url: '/dataPegawaiSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPegawaiSekolah/dataPegawaiSekolah.html',
            controller: 'dataPegawaiSekolahCtrl'
          }
        }
      })

      .state('menuAdmin.dataPensiunBaru', {
        url: '/dataPensiunBaru',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/dataPensiun/dataPensiun.html',
            controller: 'dataPensiunCtrl'
          }
        }
      })

      .state('menuAdmin.dataGuruKec', {
        url: '/dataGuruKec',
        params: {
          idKec: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/guruKec.html',
            controller: 'dataGuruKecCtrl'
          }
        }
      })

      .state('menuAdmin.detailGuru', {
        url: '/detailGuru',
        params: {
          id: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/detailGuru.html',
            controller: 'detailGuruCtrl'
          }
        }
      })

      .state('menuAdmin.dataPensiun', {
        url: '/dataPensiun',
        params: {
          tahun: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/beranda/guruPensiun.html',
            controller: 'dataGuruPensiunCtrl'
          }
        }
      })

      .state('menuAdmin.dataList', {
        url: '/dataList',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/admin/datalist.html',
            controller: 'dataListCtrl'
          }
        }
      })

      // SEKOLAH
      .state('menuSekolah', {
        url: '/sekolah',
        templateUrl: 'templates/sekolah/menuSekolah.html',
        controller: 'menuSekolahCtrl'
      })

      .state('menuSekolah.berandaSekolah', {
        url: '/berandaSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/beranda.html',
            controller: 'berandaAdminSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.dataGuruSekolah', {
        url: '/dataGuruSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/dataGuru.html',
            controller: 'dataGuruAdminSekolahCtrl'
          }
        }
      })


      .state('menuSekolah.dataPegawaiSekolah', {
        url: '/dataPegawaiSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/dataPegawai.html',
            controller: 'dataPegawaiAdminSekolahCtrl'
          }
        }
      })


      .state('menuSekolah.pengaturanSekolah', {
        url: '/pengaturanSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/pengaturan/menupengaturan.html',
            controller: 'pengaturanSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.editpasswordSekolah', {
        url: '/editpasswordSekolah',
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/pengaturan/editpassword.html',
            controller: 'editPasswordCtrl'
          }
        }
      })

      .state('menuSekolah.detailGuruAdminSekolah', {
        url: '/detailGuruAdminSekolah',
        params: {
          uid: '',
          idKec: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/detailGuru.html',
            controller: 'detailGuruAdminSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.dataGuruTambahSekolah', {
        url: '/dataGuruTambahSekolah',
        params: {
          uid: '',
          idKec: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/dataGuruTambah.html',
            controller: 'dataGuruTambahSekolahCtrl'
          }
        }
      })

      .state('menuSekolah.dataGuruEditSekolah', {
        url: '/dataGuruEditSekolah',
        params: {
          uid: '',
          idKec: '',
        },
        views: {
          'menuAdmin': {
            templateUrl: 'templates/sekolah/beranda/dataGuruEdit.html',
            controller: 'dataGuruEditSekolahCtrl'
          }
        }
      })
      

    $urlRouterProvider.otherwise('/welcome')


  });
