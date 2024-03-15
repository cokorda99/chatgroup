angular.module('app.berandaAdmin', [])

  .controller('berandaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formData = {
      "nama": "",
      "email": "",
      "message": ""
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('users');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          // console.log(snapshot.val());
          if (snapshot.val() != null) {
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
            // console.log($scope.formData.nama);
          } else {
            $ionicLoading.hide();
            console.log('TIDAK AKTIF');
            $state.go('welcome');
          }

        })

        $scope.getWaktu = function () {
          // Membuat objek Date baru
          var now = new Date();
          // Mendapatkan tanggal, bulan, tahun, jam, menit, dan detik dari objek Date
          var tanggal = now.getDate();
          var bulan = now.getMonth() + 1; // Ingat bahwa bulan dimulai dari 0 (0 = Januari, 1 = Februari, dst.)
          var tahun = now.getFullYear();
          var jam = now.getHours();
          var menit = now.getMinutes();
          var detik = now.getSeconds();
          // Mengonversi ke format "dd/mm/yyyy"
          var formatTanggal = (tanggal < 10 ? '0' : '') + tanggal + '/' + (bulan < 10 ? '0' : '') + bulan + '/' + tahun;
          // Mengonversi ke format waktu "jam:menit:detik"
          var formatWaktu = (jam < 10 ? '0' : '') + jam + ':' + (menit < 10 ? '0' : '') + menit + ':' + (detik < 10 ? '0' : '') + detik;
          // Menggabungkan tanggal dan waktu
          var formatLengkap = formatTanggal + ' ' + formatWaktu;
          // console.log(formatLengkap); // Output format "dd/mm/yyyy jam:menit:detik"
          return formatLengkap;
        }

        $scope.sendMessage = function () {
          console.log($scope.formData.message);
          var waktu = $scope.getWaktu();
          firebase.database().ref('chats/').push({
            text: $scope.formData.message,
            pengirimId : useraktif.uid,
            pengirimNama : $scope.formData.nama,
            waktu : waktu,
          })
        }

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
  }])