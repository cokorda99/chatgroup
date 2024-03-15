angular.module('app.dataPegawaiDinas', [])
.controller('dataPegawaiDinasCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $ionicLoading.show();
    $scope.formDataAdmin = {
      "nama": "",
      "email": "",
    };

    $scope.formDataPegawaiDisdik = {
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

    // JUMLAH DATA PEGAWAI DISDIKPORA
    firebase.database().ref('jmlhDataPegawaiDisdikpora').on("child_added", function (snapshot1, prevChildKey) {
      snapshot1.forEach(function (snapshot) {
        console.log(snapshot.key);
        if (snapshot.key == 'pnspLaki') {
          $scope.formDataPegawaiDisdik.pnspLaki = $scope.formDataPegawaiDisdik.pnspLaki + snapshot.val();
        }
        if (snapshot.key == 'pnspPerempuan') {
          $scope.formDataPegawaiDisdik.pnspPerempuan = $scope.formDataPegawaiDisdik.pnspPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pnsdLaki') {
          $scope.formDataPegawaiDisdik.pnsdLaki = $scope.formDataPegawaiDisdik.pnsdLaki + snapshot.val();
        }
        if (snapshot.key == 'pnsdPerempuan') {
          $scope.formDataPegawaiDisdik.pnsdPerempuan = $scope.formDataPegawaiDisdik.pnsdPerempuan + snapshot.val();
        }
        if (snapshot.key == 'honorerLaki') {
          $scope.formDataPegawaiDisdik.honorerLaki = $scope.formDataPegawaiDisdik.honorerLaki + snapshot.val();
        }
        if (snapshot.key == 'honorerPerempuan') {
          $scope.formDataPegawaiDisdik.honorerPerempuan = $scope.formDataPegawaiDisdik.honorerPerempuan + snapshot.val();
        }
        if (snapshot.key == 'kontrakLaki') {
          $scope.formDataPegawaiDisdik.kontrakLaki = $scope.formDataPegawaiDisdik.kontrakLaki + snapshot.val();
        }
        if (snapshot.key == 'kontrakPerempuan') {
          $scope.formDataPegawaiDisdik.kontrakPerempuan = $scope.formDataPegawaiDisdik.kontrakPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pppkLaki') {
          $scope.formDataPegawaiDisdik.pppkLaki = $scope.formDataPegawaiDisdik.pppkLaki + snapshot.val();
        }
        if (snapshot.key == 'pppkPerempuan') {
          $scope.formDataPegawaiDisdik.pppkPerempuan = $scope.formDataPegawaiDisdik.pppkPerempuan + snapshot.val();
        }
        if (snapshot.key == 'gtyLaki') {
          $scope.formDataPegawaiDisdik.gtyLaki = $scope.formDataPegawaiDisdik.gtyLaki + snapshot.val();
        }
        if (snapshot.key == 'gtyPerempuan') {
          $scope.formDataPegawaiDisdik.gtyPerempuan = $scope.formDataPegawaiDisdik.gtyPerempuan + snapshot.val();
        }
        if (snapshot.key == 'cpnsLaki') {
          $scope.formDataPegawaiDisdik.cpnsLaki = $scope.formDataPegawaiDisdik.cpnsLaki + snapshot.val();
        }
        if (snapshot.key == 'cpnsPerempuan') {
          $scope.formDataPegawaiDisdik.cpnsPerempuan = $scope.formDataPegawaiDisdik.cpnsPerempuan + snapshot.val();
        }
      });
      $scope.formDataPegawaiDisdik.pnspTotal = $scope.formDataPegawaiDisdik.pnspLaki + $scope.formDataPegawaiDisdik.pnspPerempuan;
      $scope.formDataPegawaiDisdik.pnsdTotal = $scope.formDataPegawaiDisdik.pnsdLaki + $scope.formDataPegawaiDisdik.pnsdPerempuan;
      $scope.formDataPegawaiDisdik.honorerTotal = $scope.formDataPegawaiDisdik.honorerLaki + $scope.formDataPegawaiDisdik.honorerPerempuan;
      $scope.formDataPegawaiDisdik.kontrakTotal = $scope.formDataPegawaiDisdik.kontrakLaki + $scope.formDataPegawaiDisdik.kontrakPerempuan;
      $scope.formDataPegawaiDisdik.pppkTotal = $scope.formDataPegawaiDisdik.pppkLaki + $scope.formDataPegawaiDisdik.pppkPerempuan;
      $scope.formDataPegawaiDisdik.gtyTotal = $scope.formDataPegawaiDisdik.gtyLaki + $scope.formDataPegawaiDisdik.gtyPerempuan;
      $scope.formDataPegawaiDisdik.cpnsTotal = $scope.formDataPegawaiDisdik.cpnsLaki + $scope.formDataPegawaiDisdik.cpnsPerempuan;
      $scope.totalPegawaiDisdik = $scope.formDataPegawaiDisdik.pnspTotal + $scope.formDataPegawaiDisdik.pnsdTotal + $scope.formDataPegawaiDisdik.honorerTotal + $scope.formDataPegawaiDisdik.kontrakTotal + $scope.formDataPegawaiDisdik.pppkTotal + $scope.formDataPegawaiDisdik.gtyTotal + $scope.formDataPegawaiDisdik.cpnsTotal;
      $ionicLoading.hide();
    });

    $scope.dataPNS = function () {
      console.log('TES PNS')
      localStorage.setItem('status_kepegawaian', 'pnsd');
      localStorage.setItem('filter', 'pegawai_disdikpora');
      $state.go('menuAdmin.dataList');
    }

    $scope.dataCPNS = function () {
      localStorage.setItem('status_kepegawaian', 'cpns');
      localStorage.setItem('filter', 'pegawai_disdikpora');
      $state.go('menuAdmin.dataList');
    }

    $scope.dataHonorer = function () {
      localStorage.setItem('status_kepegawaian', 'honorer');
      localStorage.setItem('filter', 'pegawai_disdikpora');
      $state.go('menuAdmin.dataList');
    }
    $scope.dataKontrak = function () {
      localStorage.setItem('status_kepegawaian', 'kontrak');
      localStorage.setItem('filter', 'pegawai_disdikpora');
      $state.go('menuAdmin.dataList');
    }

  }])