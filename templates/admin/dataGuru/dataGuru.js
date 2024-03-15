angular.module('app.dataGuru', [])
    .controller('dataGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

        $ionicLoading.show();
        $scope.formDataAdmin = {
            "nama": "",
            "email": "",
        };

        $scope.formData = {
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

        // JUMLAH DATA GURU
        firebase.database().ref('jmlhDataGuru').on("child_added", function (snapshot1, prevChildKey) {
            snapshot1.forEach(function (snapshot) {
                console.log(snapshot.key);

                // if (snapshot.key == 'banjar') {
                //   $scope.formData.jmlhBanjar = snapshot.val();
                // }

                // if (snapshot.key == 'buleleng') {
                //   // window.alert(snapshot.val());
                //   $scope.formData.jmlhBuleleng = snapshot.val();
                // }

                // if (snapshot.key == 'busungbiu') {
                //   $scope.formData.jmlhBusungbiu = snapshot.val();
                // }

                // if (snapshot.key == 'gerokgak') {
                //   $scope.formData.jmlhGerokgak = snapshot.val();
                // }

                // if (snapshot.key == 'kubutambahan') {
                //   $scope.formData.jmlhKubutambahan = snapshot.val();
                // }

                // if (snapshot.key == 'sawan') {
                //   $scope.formData.jmlhSawan = snapshot.val();
                // }

                // if (snapshot.key == 'seririt') {
                //   $scope.formData.jmlhSeririt = snapshot.val();
                // }

                // if (snapshot.key == 'sukasada') {
                //   $scope.formData.jmlhSukasada = snapshot.val();
                // }

                // if (snapshot.key == 'tejakula') {
                //   $scope.formData.jmlhTejakula = snapshot.val();
                // }



                if (snapshot.key == 'pnspLaki') {
                    $scope.formData.pnspLaki = $scope.formData.pnspLaki + snapshot.val();
                }
                if (snapshot.key == 'pnspPerempuan') {
                    $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + snapshot.val();
                }
                if (snapshot.key == 'pnsdLaki') {
                    $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + snapshot.val();
                }
                if (snapshot.key == 'pnsdPerempuan') {
                    $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + snapshot.val();
                }
                if (snapshot.key == 'honorerLaki') {
                    $scope.formData.honorerLaki = $scope.formData.honorerLaki + snapshot.val();
                }
                if (snapshot.key == 'honorerPerempuan') {
                    $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + snapshot.val();
                }
                if (snapshot.key == 'kontrakLaki') {
                    $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + snapshot.val();
                }
                if (snapshot.key == 'kontrakPerempuan') {
                    $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + snapshot.val();
                }
                if (snapshot.key == 'pppkLaki') {
                    $scope.formData.pppkLaki = $scope.formData.pppkLaki + snapshot.val();
                }
                if (snapshot.key == 'pppkPerempuan') {
                    $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + snapshot.val();
                }
                if (snapshot.key == 'gtyLaki') {
                    $scope.formData.gtyLaki = $scope.formData.gtyLaki + snapshot.val();
                }
                if (snapshot.key == 'gtyPerempuan') {
                    $scope.formData.gtyPerempuan = $scope.formData.gtyPerempuan + snapshot.val();
                }
                if (snapshot.key == 'cpnsLaki') {
                    $scope.formData.cpnsLaki = $scope.formData.cpnsLaki + snapshot.val();
                }
                if (snapshot.key == 'cpnsPerempuan') {
                    $scope.formData.cpnsPerempuan = $scope.formData.cpnsPerempuan + snapshot.val();
                }
            });
            $scope.formData.pnspTotal = $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            $scope.formData.pnsdTotal = $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            $scope.formData.honorerTotal = $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            $scope.formData.kontrakTotal = $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            $scope.formData.pppkTotal = $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
            $scope.formData.gtyTotal = $scope.formData.gtyLaki + $scope.formData.gtyPerempuan;
            $scope.formData.cpnsTotal = $scope.formData.cpnsLaki + $scope.formData.cpnsPerempuan;
            $scope.totalGuru = $scope.formData.pnspTotal + $scope.formData.pnsdTotal + $scope.formData.honorerTotal + $scope.formData.kontrakTotal + $scope.formData.pppkTotal + $scope.formData.gtyTotal + $scope.formData.cpnsTotal;
            $ionicLoading.hide();
        });


        $scope.dataPNS = function () {
            console.log('TES PNS')
            localStorage.setItem('status_kepegawaian', 'pnsd');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }

        $scope.dataCPNS = function () {
            localStorage.setItem('status_kepegawaian', 'cpns');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }

        $scope.dataHonorer = function () {
            localStorage.setItem('status_kepegawaian', 'honorer');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }
        $scope.dataKontrak = function () {
            localStorage.setItem('status_kepegawaian', 'kontrak');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }

        $scope.dataPPPK = function () {
            localStorage.setItem('status_kepegawaian', 'pppk');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }
        $scope.dataGTY = function () {
            localStorage.setItem('status_kepegawaian', 'gty');
            localStorage.setItem('filter', 'Guru_kepala');
            $state.go('menuAdmin.dataList');
        }
    }])