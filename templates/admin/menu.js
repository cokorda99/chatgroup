angular.module('app.menu', [])

    .controller('menuCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

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
        //                 $state.go('menu.berandaAdmin');
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
                title: 'Keluar Chatgroup',
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