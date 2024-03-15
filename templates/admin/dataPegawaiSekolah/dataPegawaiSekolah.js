angular.module('app.dataPegawaiSekolah', [])
.controller('dataPegawaiSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $ionicLoading.show();
    $scope.formDataAdmin = {
      "nama": "",
      "email": "",
    };
    $scope.formDataPegawai = {
      "jmlhBanjar": 0,
      "jmlhBuleleng": 0,
      "jmlhBusungbiu": 0,
      "jmlhGerokgak": 0,
      "jmlhKubutambahan": 0,
      "jmlhSawan": 0,
      "jmlhSeririt": 0,
      "jmlhSukasada": 0,
      "jmlhTejakula": 0,
      "pnspLaki": 0,
      "pnspPerempuan": 0,
      "pnspTotal": 0,
      "pnsdLaki": 0,
      "pnsdPerempuan": 0,
      "pnsdTotal": 0,
      "honorerLaki": 0,
      "honorerPerempuan": 0,
      "honorerTotal": 0,
      "kontrakLaki": 0,
      "kontrakPerempuan": 0,
      "kontrakTotal": 0,
      "pppkLaki": 0,
      "pppkPerempuan": 0,
      "pppkTotal": 0,
      "gtyLaki": 0,
      "gtyPerempuan": 0,
      "gtyTotal": 0,
      "cpnsLaki": 0,
      "cpnsPerempuan": 0,
      "cpnsTotal": 0,
    };

    $scope.tempData = $scope.formData;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('dinas');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formDataAdmin.nama = snapshot.val().nama;
            $scope.formDataAdmin.email = snapshot.val().email;
          } else {
            $ionicLoading.hide();
            console.log('TIDAK AKTIF');
            $state.go('welcome');
          }

        })

        $scope.logout = function () {
          firebase.auth().signOut();
        }
      }
      else {
        $ionicLoading.hide();
        console.log('TIDAK AKTIF');
        $state.go('welcome');
      }
    });
    // JUMLAH DATA PEGAWAI SEKOLAH
    firebase.database().ref('jmlhDataPegawaiSekolah').on("child_added", function (snapshot1, prevChildKey) {
      snapshot1.forEach(function (snapshot) {
        console.log(snapshot.key);

        // if (snapshot.key == 'banjar') {
        //   $scope.formDataPegawai.jmlhBanjar = snapshot.val();
        // }

        // if (snapshot.key == 'buleleng') {
        //   // window.alert(snapshot.val());
        //   $scope.formDataPegawai.jmlhBuleleng = snapshot.val();
        // }

        // if (snapshot.key == 'busungbiu') {
        //   $scope.formDataPegawai.jmlhBusungbiu = snapshot.val();
        // }

        // if (snapshot.key == 'gerokgak') {
        //   $scope.formDataPegawai.jmlhGerokgak = snapshot.val();
        // }

        // if (snapshot.key == 'kubutambahan') {
        //   $scope.formDataPegawai.jmlhKubutambahan = snapshot.val();
        // }

        // if (snapshot.key == 'sawan') {
        //   $scope.formDataPegawai.jmlhSawan = snapshot.val();
        // }

        // if (snapshot.key == 'seririt') {
        //   $scope.formDataPegawai.jmlhSeririt = snapshot.val();
        // }

        // if (snapshot.key == 'sukasada') {
        //   $scope.formDataPegawai.jmlhSukasada = snapshot.val();
        // }

        // if (snapshot.key == 'tejakula') {
        //   $scope.formDataPegawai.jmlhTejakula = snapshot.val();
        // }



        if (snapshot.key == 'pnspLaki') {
          $scope.formDataPegawai.pnspLaki = $scope.formDataPegawai.pnspLaki + snapshot.val();
        }
        if (snapshot.key == 'pnspPerempuan') {
          $scope.formDataPegawai.pnspPerempuan = $scope.formDataPegawai.pnspPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pnsdLaki') {
          $scope.formDataPegawai.pnsdLaki = $scope.formDataPegawai.pnsdLaki + snapshot.val();
        }
        if (snapshot.key == 'pnsdPerempuan') {
          $scope.formDataPegawai.pnsdPerempuan = $scope.formDataPegawai.pnsdPerempuan + snapshot.val();
        }
        if (snapshot.key == 'honorerLaki') {
          $scope.formDataPegawai.honorerLaki = $scope.formDataPegawai.honorerLaki + snapshot.val();
        }
        if (snapshot.key == 'honorerPerempuan') {
          $scope.formDataPegawai.honorerPerempuan = $scope.formDataPegawai.honorerPerempuan + snapshot.val();
        }
        if (snapshot.key == 'kontrakLaki') {
          $scope.formDataPegawai.kontrakLaki = $scope.formDataPegawai.kontrakLaki + snapshot.val();
        }
        if (snapshot.key == 'kontrakPerempuan') {
          $scope.formDataPegawai.kontrakPerempuan = $scope.formDataPegawai.kontrakPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pppkLaki') {
          $scope.formDataPegawai.pppkLaki = $scope.formDataPegawai.pppkLaki + snapshot.val();
        }
        if (snapshot.key == 'pppkPerempuan') {
          $scope.formDataPegawai.pppkPerempuan = $scope.formDataPegawai.pppkPerempuan + snapshot.val();
        }
        if (snapshot.key == 'gtyLaki') {
          $scope.formDataPegawai.gtyLaki = $scope.formDataPegawai.gtyLaki + snapshot.val();
        }
        if (snapshot.key == 'gtyPerempuan') {
          $scope.formDataPegawai.gtyPerempuan = $scope.formDataPegawai.gtyPerempuan + snapshot.val();
        }
        if (snapshot.key == 'cpnsLaki') {
          $scope.formDataPegawai.cpnsLaki = $scope.formDataPegawai.cpnsLaki + snapshot.val();
        }
        if (snapshot.key == 'cpnsPerempuan') {
          $scope.formDataPegawai.cpnsPerempuan = $scope.formDataPegawai.cpnsPerempuan + snapshot.val();
        }
      });
      $scope.formDataPegawai.pnspTotal = $scope.formDataPegawai.pnspLaki + $scope.formDataPegawai.pnspPerempuan;
      $scope.formDataPegawai.pnsdTotal = $scope.formDataPegawai.pnsdLaki + $scope.formDataPegawai.pnsdPerempuan;
      $scope.formDataPegawai.honorerTotal = $scope.formDataPegawai.honorerLaki + $scope.formDataPegawai.honorerPerempuan;
      $scope.formDataPegawai.kontrakTotal = $scope.formDataPegawai.kontrakLaki + $scope.formDataPegawai.kontrakPerempuan;
      $scope.formDataPegawai.pppkTotal = $scope.formDataPegawai.pppkLaki + $scope.formDataPegawai.pppkPerempuan;
      $scope.formDataPegawai.gtyTotal = $scope.formDataPegawai.gtyLaki + $scope.formDataPegawai.gtyPerempuan;
      $scope.formDataPegawai.cpnsTotal = $scope.formDataPegawai.cpnsLaki + $scope.formDataPegawai.cpnsPerempuan;
      $scope.totalPegawai = $scope.formDataPegawai.pnspTotal + $scope.formDataPegawai.pnsdTotal + $scope.formDataPegawai.honorerTotal + $scope.formDataPegawai.kontrakTotal + $scope.formDataPegawai.pppkTotal + $scope.formDataPegawai.gtyTotal + $scope.formDataPegawai.cpnsTotal;
      $ionicLoading.hide();
    });

    $scope.dataPNS = function () {
      console.log('TES PNS')
      localStorage.setItem('status_kepegawaian', 'pnsd');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }

  $scope.dataCPNS = function () {
      localStorage.setItem('status_kepegawaian', 'cpns');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }

  $scope.dataHonorer = function () {
      localStorage.setItem('status_kepegawaian', 'honorer');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }
  $scope.dataKontrak = function () {
      localStorage.setItem('status_kepegawaian', 'kontrak');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }

  $scope.dataPPPK = function () {
      localStorage.setItem('status_kepegawaian', 'pppk');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }
  $scope.dataGTY = function () {
      localStorage.setItem('status_kepegawaian', 'gty');
      localStorage.setItem('filter', 'pegawai_sekolah');
      $state.go('menuAdmin.dataList');
  }
  }])