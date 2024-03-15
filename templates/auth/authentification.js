angular.module('app.authentification', [])

    .controller('welcomeCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                console.log(useraktif.uid)
                $state.go('menu.berandaAdmin');
            } else {
                console.log('TIDAK AKTIF');

                $scope.formData = {
                    "email": '',
                    "password": '',
                    // "sebagai": ''
                };
                // LOGIN CHAT
                $scope.login = function () {
                    $ionicLoading.show();

                    var email = $scope.formData.email;
                    var password = $scope.formData.password;

                    if (email != '' && password != '') {
                        firebase.database().ref('users').orderByChild('email').equalTo(email).on('value', function (snapshot) {
                            if (snapshot.val()) {
                                $firebaseAuth().$signInWithEmailAndPassword(email, password).then(function (result) {
                                    $ionicLoading.hide();
                                    $state.go('menu.berandaAdmin', {
                                        // "idUser": userUid,
                                    });
                                    // window.alert('login berhasil');
                                }).then(function (reload) {
                                    location.reload();
                                }).catch(function (error) {
                                    // Handle Errors here.
                                    var errorCode = error.code;
                                    var errorMessage = error.message;
                                    $ionicLoading.hide();

                                    if (errorCode == 'auth/user-not-found') {
                                        var confirmPopup = $ionicPopup.alert({
                                            // title: 'Keluar Data Centre',
                                            template: 'Email tidak terdaftar',
                                            // okType: 'button-positive'
                                        });
                                        // return window.alert('Email tidak terdaftar sebagai admin');
                                    }
                                    else if (errorCode == 'auth/wrong-password') {
                                        $ionicLoading.hide();
                                        var confirmPopup = $ionicPopup.alert({
                                            // title: 'Keluar Data Centre',
                                            template: 'Password tidak sesuai',
                                            // okType: 'button-positive'
                                        });
                                        // return window.alert('Password tidak sesuai');
                                    }
                                    else {
                                        $ionicLoading.hide();
                                        var confirmPopup = $ionicPopup.alert({
                                            // title: 'Keluar Data Centre',
                                            template: errorMessage,
                                            // okType: 'button-positive'
                                        });
                                        // return window.alert(errorMessage);
                                    }
                                });
                            } else {
                                $ionicLoading.hide();
                                var confirmPopup = $ionicPopup.alert({
                                    // title: 'Keluar Data Centre',
                                    template: 'Email tidak terdaftar',
                                    // okType: 'button-positive'
                                });
                                // return window.alert('Email tidak terdaftar sebagai dinas');
                            }
                        });
                    } else {
                        console.log('POP UP');
                        $ionicLoading.hide();
                        var confirmPopup = $ionicPopup.alert({
                            // title: 'Keluar Data Centre',
                            template: 'Email atau Password tidak boleh Kosong',
                            // okType: 'button-positive'
                        });
                    }
                }
            }
        });
    }])