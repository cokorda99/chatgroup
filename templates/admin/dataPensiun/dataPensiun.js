angular.module('app.dataPensiun', [])
  .controller('dataPensiunCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {


    $scope.datalistPensiun = function (tahun_pensiun) {
      localStorage.setItem('tahun_pensiun', tahun_pensiun);
      $state.go("menuAdmin.dataPensiun")
    }

    // $ionicLoading.show();
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


    // JUMLAH DATA PENSIUN

    var ref = firebase.database().ref("jmlhDataPensiun");
    var listRef = $firebaseArray(ref);

    listRef.$loaded().then(function (response) {
      $scope.pensiunan = response;
      $ionicLoading.hide();
    });
  }])