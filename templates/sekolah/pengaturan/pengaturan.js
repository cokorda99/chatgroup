angular.module('app.pengaturanSekolah', [])

  .controller('pengaturanSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formData = {
      // "nip": dataSnapShot.val().nip,
      "nama": "",
      "email": "",
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
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

    $scope.editpassword = function () {
        $state.go('menuSekolah.editpasswordSekolah');
      }
  }])

  .controller('editPasswordCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formData = {
      // "nip": dataSnapShot.val().nip,
      "nama": "",
      "email": "",
      "password": "",
      "uid": "",
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
            $scope.formData.password = snapshot.val().passwordDisplay;
            $scope.formData.uid = snapshot.val().uid;
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

    $scope.editPassword = function () {
        console.log($scope.formData.password);
        if ($scope.formData.password != null) {
            var password = $scope.formData.password;
            firebase.database().ref('adminSekolah/' + $scope.formData.uid).update({
                passwordDisplay: password,
            }).then(function () {
                window.alert('Password Berhasil di Update')
            });
        } else {
            window.alert('PASSWORD TIDAK BOLEH KOSONG')
        }
    }
  }])