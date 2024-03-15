angular.module('app.menuGuru', [])

    .controller('menuGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
        // window.alert('menu guru');
        // $ionicLoading.show();
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         // console.log('USER AKTIF');
        //         var useraktif = firebase.auth().currentUser;
        //         // console.log(useraktif.uid)
        //         $ionicLoading.hide();
        //         firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {
        //             if(snapshot.val().status == 'guru'){
        //                 $state.go('menuGuru.berandaGuru');
        //             }else{
        //                 $state.go('menuAdmin.berandaAdmin');
        //             }   
        //         });
    
        //     }else{
        //         $ionicLoading.hide();
        //         console.log('TIDAK AKTIF');
        //         $state.go('welcome');
        //     }
        // });
        
        $scope.goBeranda = function () {
            $state.go('menuGuru.berandaGuru');
        }

        $scope.goprofil = function () {
            $state.go('menuGuru.profilGuru');
        }

        $scope.logout = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Keluar Data Centre',
                template: 'Apakah anda yakin akan keluar aplikasi?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    localStorage.removeItem('nikUser');
                    firebase.auth().signOut();
                    $state.go('welcome');
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        }

    }])