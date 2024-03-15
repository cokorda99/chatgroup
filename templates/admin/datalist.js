angular.module('app.datalist', [])
  .controller('dataListCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formData = {
      "nama": "",
      "email": "",
      "sttsSertif": "-",
      "agama": "-",
      "tmptTugas": "-",
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
      "totalGtk": 0,
      // "jenisProfesi": "-",
      "filterPegawai": "-",
      "filterDetail": "-",
      "filterKecamatan": "-",
    };

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
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
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
    // var ref = firebase.database().ref("gtk").orderByChild('tahun_pensiun').equalTo(tahun);
    var refKec = firebase.database().ref("kecamatan");
    $scope.dataKec = $firebaseArray(refKec);
    $scope.status_kepegawaian = localStorage.getItem('status_kepegawaian');
    $scope.filter = localStorage.getItem('filter');
    console.log($scope.filter ,  $scope.status_kepegawaian);

    $ionicLoading.show();
    var ref = firebase.database().ref("datafilter/" + $scope.filter).orderByChild('status_kepegawaian').equalTo($scope.status_kepegawaian);
    var listRef = $firebaseArray(ref);

    listRef.$loaded().then(function (response) {
      $scope.dataGuru = response;
      $scope.formData.totalGtk = response.length;
      $ionicLoading.hide();
    });

    // $scope.selectKecamatan = function () {
    //   $ionicLoading.show();
    //   var ref = firebase.database().ref("gurulist/" + $scope.filter + "/" + $scope.formData.filterKecamatan).orderByChild('status_kepegawaian').equalTo($scope.status_kepegawaian);
    //   var listRef = $firebaseArray(ref);

    //   listRef.$loaded().then(function (response) {
    //     $scope.dataGuru = response;
    //     $scope.formData.totalGtk = response.length;
    //     $ionicLoading.hide();
    //   });
    // }

    $scope.detailGuru = function (data) {
      $state.go("menuAdmin.detailGuru", {
        "id": data.$id,
      })
    }
  }])



