angular.module('app.controllers', [])

    .controller('menuAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {
    }])

    .controller('menuGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {

        $scope.idGuru = localStorage.getItem('idGuru');
        $scope.namaGuru = localStorage.getItem('namaGuru');
        $scope.emailGuru = localStorage.getItem('emailGuru');
        $scope.uidGuru = localStorage.getItem('uidGuru');
        $scope.idSekolahGuru = localStorage.getItem('idSekolahGuru');
        $scope.jenjangGuru = localStorage.getItem('jenjangGuru');
        $scope.idProvinsiGuru = localStorage.getItem('idProvinsiGuru');
        $scope.idKotaKabupatenGuru = localStorage.getItem('idKotaKabupatenGuru');
        $scope.idKecamatanGuru = localStorage.getItem('idKecamatanGuru');

        if (!$scope.idGuru) {
            $state.go('welcome');
        }

        // var versiAplikasiUser = "0.0.11";
        // // VERSI APLIKASI
        // var versiAplikasi = firebase.database().ref("versiAplikasi/1");
        // versiAplikasi.on("value", function (snapshot) {
        //     $scope.update = snapshot.val();
        //     $scope.versiAplikasiMaster = snapshot.val().versi;
        //     // IJINKAN AKSES
        //     if (versiAplikasiUser === $scope.versiAplikasiMaster) {
        //         $scope.akses = true;
        //     }
        //     else {
        //         $scope.akses = false;
        //     }
        // });

        var akses = firebase.database(appGuru).ref("dataGuru/" + $scope.idGuru);
        $ionicLoading.show();
        akses.on("value", function (snapshot) {
            $ionicLoading.hide();
            $scope.ijinPenggunaanAplikasi = snapshot.val().ijinPenggunaanAplikasi;
        });

        $scope.logoutGuru = function () {

            var confirmPopup = $ionicPopup.confirm({
                title: 'Logout Application',
                template: 'Are you sure to logout this apps?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('idGuru');
                    localStorage.removeItem('namaGuru');
                    localStorage.removeItem('emailGuru');
                    localStorage.removeItem('uidGuru');
                    localStorage.removeItem('idSekolahGuru');
                    localStorage.removeItem('jenjangGuru');
                    localStorage.removeItem('idProvinsiGuru');
                    localStorage.removeItem('idKotaKabupatenGuru');
                    localStorage.removeItem('idKecamatanGuru')
                    localStorage.clear();
                    $state.go("welcome");
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        };
    }])

    .controller('menuSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter) {
    }])


