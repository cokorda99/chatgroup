angular.module('app.berandaGuru', [])
    .controller('berandaGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
        // window.alert('beranda guru');
        $scope.nikUser = localStorage.getItem('nikUser');
        // console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
            // "nip": dataSnapShot.val().nip,
            "nama": "",
            "nik": "",
            "id_kec": "",
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // console.log('USER AKTIF');
                var useraktif = firebase.auth().currentUser;
                // console.log(useraktif.uid)
                var dbRef = firebase.database();
                var pengguna = dbRef.ref('listUser');
                pengguna.child(useraktif.uid).on("value", function (snapshot) {
                    // console.log(snapshot.val());
                    // window.alert(snapshot.val().id_kec);
                    if (snapshot.val() != null) {
                        firebase.database().ref('gtk').child(snapshot.val().nik).on("value", function (dataSnapshot) {
                            if (dataSnapshot.val() != null) {
                                $ionicLoading.hide();
                                $scope.formData.nama = dataSnapshot.val().nama
                                $scope.formData.nik = dataSnapshot.val().nik;
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;

                                firebase.database().ref('gtk').child(snapshot.val().nik).child('file').on("value", function (dataSnapshot) {
                                    if (dataSnapshot.val() != null) {
                                        $ionicLoading.hide();
                                        console.log('ADA BERKAS VAKSIN');
                                        $scope.vaksin = true;


                                    } else {
                                        $ionicLoading.hide();
                                        console.log('TIDAK ADA BERKAS VAKSIN');
                                        $scope.vaksin = false;

                                    }

                                });

                                firebase.database().ref('gtk').child(snapshot.val().nik).child('fotoProfil').on("value", function (dataSnapshot) {
                                    if (dataSnapshot.val() != null) {
                                        $ionicLoading.hide();
                                        console.log('ADA BERKAS FOTO');
                                        $scope.fotoProfil = true;


                                        firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/fotoProfil').on('value', function (snapshot) {
                                            var data = snapshot.val();
                                            var url = data.URL
                                            console.log(url);
                                            $scope.fotoProfilUrl = url;
                                        })


                                    } else {
                                        $ionicLoading.hide();
                                        console.log('TIDAK ADA BERKAS FOTO');
                                        $scope.fotoProfil = false;

                                    }

                                });

                            } else {
                                $ionicLoading.hide();
                                console.log('TIDAK AKTIF');
                                $state.go('welcome');
                            }

                        });

                    } else {
                        $ionicLoading.hide();
                        console.log('TIDAK AKTIF');
                        $state.go('welcome');
                    }

                })

                $scope.logout = function () {
                    localStorage.removeItem('nikUser');
                    firebase.auth().signOut();
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }
        });


        $scope.goprofil = function () {
            $state.go('menuGuru.profilGuru');
        }

        $scope.goVaksin = function () {
            $state.go('menuGuru.kartuVaksinGuru');
        }

        $scope.goUploadVaksin = function () {
            $state.go('menuGuru.UploadkartuVaksinGuru');
        }
    }])

    .controller('kartuVaksinGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
        $scope.nikUser = localStorage.getItem('nikUser');
        $ionicLoading.show();
        $scope.formData = {
            // "nip": dataSnapShot.val().nip,
            "nama": "",
            "nik": "",
            "id_kec": "",
        };
        // $ionicLoading.hide();

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('USER AKTIF');
                var useraktif = firebase.auth().currentUser;
                console.log(useraktif.uid)
                var dbRef = firebase.database();
                var pengguna = dbRef.ref('listUser');
                pengguna.child(useraktif.uid).on("value", function (snapshot) {
                    // console.log(snapshot.val());
                    // window.alert(snapshot.val().id_kec);
                    if (snapshot.val() != null) {
                        firebase.database().ref('gtk').child(snapshot.val().nik).on("value", function (dataSnapshot) {
                            if (dataSnapshot.val() != null) {
                                // window.alert(dataSnapshot.val().nama);
                                $scope.formData.nama = dataSnapshot.val().nama
                                $scope.formData.nik = dataSnapshot.val().nik;
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;
                            } else {
                                // $ionicLoading.hide();
                                console.log('TIDAK AKTIF');
                                $state.go('welcome');
                            }


                            firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/file').on('value', function (snapshot) {
                                var data = snapshot.val();
                                var url = data.URL
                                console.log(url);
                                $scope.kartuVaksin1 = url;
                                $scope.lihatKartuVaksin1 = function () {
                                    window.open(url);
                                }
                            })

                            firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/file2').on('value', function (snapshot) {
                                var data2 = snapshot.val();
                                var url2 = data2.URL
                                console.log(url2);
                                $scope.kartuVaksin2 = url2;
                                $scope.lihatKartuVaksin2 = function () {
                                    window.open(url2);
                                }
                            })

                            firebase.database().ref('gtk').child(snapshot.val().nik).child('fotoProfil').on("value", function (dataSnapshot) {
                                if (dataSnapshot.val() != null) {
                                    $ionicLoading.hide();
                                    console.log('ADA BERKAS FOTO');
                                    $scope.fotoProfil = true;


                                    firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/fotoProfil').on('value', function (snapshot) {
                                        var data = snapshot.val();
                                        var url = data.URL
                                        console.log(url);
                                        $scope.fotoProfilUrl = url;
                                    })


                                } else {
                                    $ionicLoading.hide();
                                    console.log('TIDAK ADA BERKAS FOTO');
                                    $scope.fotoProfil = false;

                                }

                            });

                        });

                    } else {
                        $ionicLoading.hide();
                        console.log('TIDAK AKTIF');
                        $state.go('welcome');
                    }

                })

                $scope.logout = function () {
                    localStorage.removeItem('nikUser');
                    firebase.auth().signOut();
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }
        });


        // $scope.goprofil = function () {
        //     $state.go('menuGuru.profilGuru');
        // }

    }])

    .controller('UploadkartuVaksinGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $firebaseStorage) {
        $scope.nikUser = localStorage.getItem('nikUser');
        $ionicLoading.show();
        $scope.formData = {
            // "nip": dataSnapShot.val().nip,
            "nama": "",
            "nik": "",
            "id_kec": "",
        };

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('USER AKTIF');
                var useraktif = firebase.auth().currentUser;
                console.log(useraktif.uid)
                var dbRef = firebase.database();
                var pengguna = dbRef.ref('listUser');
                pengguna.child(useraktif.uid).on("value", function (snapshot) {
                    // console.log(snapshot.val());
                    // window.alert(snapshot.val().id_kec);
                    if (snapshot.val() != null) {
                        firebase.database().ref('gtk').child(snapshot.val().nik).on("value", function (dataSnapshot) {
                            if (dataSnapshot.val() != null) {
                                // window.alert(dataSnapshot.val().nama);
                                $scope.formData.nama = dataSnapshot.val().nama;
                                $scope.formData.nik = dataSnapshot.val().nik;
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;

                                firebase.database().ref('gtk').child(snapshot.val().nik).child('file').on("value", function (dataSnapshot) {
                                    if (dataSnapshot.val() != null) {
                                        $ionicLoading.hide();
                                        console.log('ADA BERKAS VAKSIN 1 ');
                                        $scope.vaksin1 = true;

                                        firebase.database().ref('gtk').child(snapshot.val().nik).child('file2').on("value", function (dataSnapshot) {
                                            if (dataSnapshot.val() != null) {
                                                $ionicLoading.hide();
                                                console.log('ADA BERKAS VAKSIN 2');
                                                $scope.vaksin2 = true;


                                            } else {
                                                $ionicLoading.hide();
                                                console.log('TIDAK ADA BERKAS VAKSIN 2');
                                                $scope.vaksin2 = false;

                                            }

                                        });

                                    } else {
                                        $ionicLoading.hide();
                                        console.log('TIDAK ADA BERKAS VAKSIN 1');
                                        $scope.vaksin1 = false;

                                    }

                                });

                            } else {
                                $ionicLoading.hide();
                                console.log('TIDAK AKTIF');
                                $state.go('welcome');
                            }

                        });


                    } else {
                        $ionicLoading.hide();
                        console.log('TIDAK AKTIF');
                        $state.go('welcome');
                    }

                })

                $scope.logout = function () {
                    localStorage.removeItem('nikUser');
                    firebase.auth().signOut();
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }

            $scope.UploadVaksin1 = function () {
                // File Vaksin1 
                var storageRef = firebase.storage().ref("gtk/" + $scope.nikUser + "/vaksin1");
                var storage = $firebaseStorage(storageRef);
                var file = document.querySelector("#inputVaksin1").files[0];

                if (file != undefined) {
                    var metadata = {
                        contentType: file.type
                    }
                    $ionicLoading.show();

                    //Upload File 1 
                    var uploadTask = storage.$put(file);
                    uploadTask.$complete(function (snapshot) {
                        storageRef.getDownloadURL().then(function (url) {
                            console.log(url);
                            var refAddFoto = firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/file');
                            refAddFoto.set({
                                "URL": url,
                                "namaFile": snapshot.metadata.name
                            }).then(function (response) {
                                $ionicLoading.hide();
                                return true;
                            }).then(function (error) {
                                ////console.log(error);
                            });
                        }).catch(function (error) {
                            // Handle any errors
                        });
                    })
                } else {
                    window.alert('FILE TIDAK BOLEH KOSONG');
                }
            }

            $scope.UploadVaksin2 = function () {

                // File Vaksin2 
                var storageRef2 = firebase.storage().ref("gtk/" + $scope.nikUser + "/vaksin2");
                var storage2 = $firebaseStorage(storageRef2);
                var file2 = document.querySelector("#inputVaksin2").files[0];

                if (file2 != undefined) {
                    var metadata = {
                        contentType: file2.type
                    }
                    $ionicLoading.show();

                    //Upload File 2 
                    var uploadTask2 = storage2.$put(file2);
                    uploadTask2.$complete(function (snapshot) {
                        storageRef2.getDownloadURL().then(function (url2) {
                            console.log(url2);
                            var refAddFoto = firebase.database().ref('gtk/' + $scope.formData.id_kec + '/' + $scope.nikUser + '/file2');
                            refAddFoto.set({
                                "URL": url2,
                                "namaFile": snapshot.metadata.name
                            }).then(function (response) {
                                $ionicLoading.hide();
                                return true;
                            }).then(function (error) {
                                ////console.log(error);
                            });
                        }).catch(function (error) {
                            // Handle any errors
                        });
                    })

                } else {
                    window.alert('FILE TIDAK BOLEH KOSONG');
                }
            }
        });

    }])



