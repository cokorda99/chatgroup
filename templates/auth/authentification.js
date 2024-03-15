angular.module('app.authentification', [])

    .controller('welcomeCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                // $scope.nikUser = localStorage.getItem('nikUser');
                // firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {

                //     if (snapshot.val().status == 'guru') {
                //         $state.go('menuGuru.berandaGuru');
                //     } else if (snapshot.val().status == 'sekolah') {
                //         $state.go('menuSekolah.berandaSekolah');
                //     } else {
                //         $state.go('menu.berandaAdmin');
                //     }

                // });

            }
        });

        $scope.formData = {
            "email": '',
            "password": '',
            // "sebagai": ''
        };
        // LOGIN CHAT
        $scope.login = function () {
            // $ionicLoading.show();

            var email = $scope.formData.email;
            var password = $scope.formData.password;

            if (email != '' && password != '') {
                console.log(email, password);
                $state.go('menu.berandaAdmin', {
                    // "idUser": userUid,
                });
            } else {
                console.log('POP UP');
            }


            // if ($scope.formData.email) {
            //     if ($scope.formData.password !== '') {
            //         firebase.database().ref('dinas').orderByChild('email').equalTo($scope.formData.email).on('value', function (snapshot) {
            //             if (snapshot.val()) {
            //                 $firebaseAuth().$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password).then(function (result) {
            //                     $ionicLoading.hide();
            //                     $state.go('menu.berandaAdmin', {
            //                         // "idUser": userUid,
            //                     });
            //                     // window.alert('login berhasil');
            //                 }).then(function (reload) {
            //                     location.reload();
            //                 }).catch(function (error) {
            //                     // Handle Errors here.
            //                     var errorCode = error.code;
            //                     var errorMessage = error.message;
            //                     $ionicLoading.hide();

            //                     if (errorCode == 'auth/user-not-found') {
            //                         var confirmPopup = $ionicPopup.alert({
            //                             // title: 'Keluar Data Centre',
            //                             template: 'Email tidak terdaftar sebagai dinas',
            //                             // okType: 'button-positive'
            //                         });
            //                         // return window.alert('Email tidak terdaftar sebagai admin');
            //                     }
            //                     else if (errorCode == 'auth/wrong-password') {
            //                         $ionicLoading.hide();
            //                         var confirmPopup = $ionicPopup.alert({
            //                             // title: 'Keluar Data Centre',
            //                             template: 'Password tidak sesuai',
            //                             // okType: 'button-positive'
            //                         });
            //                         // return window.alert('Password tidak sesuai');
            //                     }
            //                     else {
            //                         $ionicLoading.hide();
            //                         var confirmPopup = $ionicPopup.alert({
            //                             // title: 'Keluar Data Centre',
            //                             template: errorMessage,
            //                             // okType: 'button-positive'
            //                         });
            //                         // return window.alert(errorMessage);
            //                     }
            //                 });
            //             } else {
            //                 $ionicLoading.hide();
            //                 var confirmPopup = $ionicPopup.alert({
            //                     // title: 'Keluar Data Centre',
            //                     template: 'Email tidak terdaftar sebagai dinas',
            //                     // okType: 'button-positive'
            //                 });
            //                 // return window.alert('Email tidak terdaftar sebagai dinas');
            //             }
            //         });
            //     } else {
            //         $ionicLoading.hide();
            //         var confirmPopup = $ionicPopup.alert({
            //             // title: 'Keluar Data Centre',
            //             template: 'Password tidak boleh kosong',
            //             // okType: 'button-positive'
            //         });
            //         // window.alert('Password tidak boleh kosong');
            //     }
            // }
            // else {
            //     $ionicLoading.hide();
            //     var confirmPopup = $ionicPopup.alert({
            //         // title: 'Keluar Data Centre',
            //         template: 'Email tidak valid',
            //         // okType: 'button-positive'
            //     });
            //     // window.alert('Email tidak valid');
            // }

        }
    }])