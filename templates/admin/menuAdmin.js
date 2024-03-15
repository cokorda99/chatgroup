angular.module('app.menuAdmin', [])

    .controller('menuAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

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

        $scope.logout = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Keluar Data Centre',
                template: 'Apakah anda yakin akan keluar aplikasi?',
                okType: 'button-positive'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    firebase.auth().signOut();
                    $state.go('welcome');
                } else {
                    console.log('You are not sure');
                }
            }).then(function (resp) {

            })
        }

    }])