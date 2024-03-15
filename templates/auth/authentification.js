angular.module('app.authentification', [])

    .controller('welcomeCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                $scope.nikUser = localStorage.getItem('nikUser');
                firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {

                    if (snapshot.val().status == 'guru') {
                        $state.go('menuGuru.berandaGuru');
                    } else if (snapshot.val().status == 'sekolah') {
                        $state.go('menuSekolah.berandaSekolah');
                    } else {
                        $state.go('menuAdmin.berandaAdmin');
                    }

                });

            }
        });
        $scope.login = function () {
            $ionicActionSheet.show({
                titleText: '<center>Login Sebagai</center>',
                buttons: [
                    { text: '<center>Admin</center>' },
                    { text: '<center>Admin Sekolah</center>' },
                    { text: '<center>GTK atau Pegawai</center>' },
                ],
                cancelText: 'Cancel',
                cancel: function () {
                    //console.log('CANCELLED');
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('loginDinas');
                    }
                    if (index === 1) {
                        $state.go('loginSekolah');
                    }
                    if (index === 2) {
                        $state.go('loginGuru');
                    }
                    return true;
                },
            });
        }

    }])

    .controller('loginDinasCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                $scope.nikUser = localStorage.getItem('nikUser');
                firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {

                    if (snapshot.val().status == 'guru') {
                        $state.go('menuGuru.berandaGuru');
                    } else if (snapshot.val().status == 'sekolah') {
                        $state.go('menuSekolah.berandaSekolah');
                    } else {
                        $state.go('menuAdmin.berandaAdmin');
                    }

                });

            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $scope.formData = {
                    "email": '',
                    "password": '',
                    // "sebagai": ''
                };

                $scope.login = function () {
                    $ionicLoading.show();
                    console.log($scope.formData.email);
                    console.log($scope.formData.password);
                    if ($scope.formData.email) {
                        if ($scope.formData.password !== '') {
                            firebase.database().ref('dinas').orderByChild('email').equalTo($scope.formData.email).on('value', function (snapshot) {
                                if (snapshot.val()) {
                                    $firebaseAuth().$signInWithEmailAndPassword($scope.formData.email, $scope.formData.password).then(function (result) {
                                        $ionicLoading.hide();
                                        $state.go('menuAdmin.berandaAdmin', {
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
                                                template: 'Email tidak terdaftar sebagai dinas',
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
                                        template: 'Email tidak terdaftar sebagai dinas',
                                        // okType: 'button-positive'
                                    });
                                    // return window.alert('Email tidak terdaftar sebagai dinas');
                                }
                            });
                        } else {
                            $ionicLoading.hide();
                            var confirmPopup = $ionicPopup.alert({
                                // title: 'Keluar Data Centre',
                                template: 'Password tidak boleh kosong',
                                // okType: 'button-positive'
                            });
                            // window.alert('Password tidak boleh kosong');
                        }
                    }
                    else {
                        $ionicLoading.hide();
                        var confirmPopup = $ionicPopup.alert({
                            // title: 'Keluar Data Centre',
                            template: 'Email tidak valid',
                            // okType: 'button-positive'
                        });
                        // window.alert('Email tidak valid');
                    }
                }

                $scope.kembali = function () {
                    $state.go('welcome');
                }
            }
        });

    }])

    .controller('loginSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                $scope.nikUser = localStorage.getItem('nikUser');
                firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {

                    if (snapshot.val().status == 'guru') {
                        $state.go('menuGuru.berandaGuru');
                    } else if (snapshot.val().status == 'sekolah') {
                        $state.go('menuSekolah.berandaSekolah');
                    } else {
                        $state.go('menuAdmin.berandaAdmin');
                    }

                });

            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $scope.formData = {
                    "email": '',
                    "password": '',
                };

                $scope.login = function () {
                    console.log($scope.formData.email)
                    console.log($scope.formData.password)
                    var emailLogin = $scope.formData.email + '@gmail.com';
                    console.log(emailLogin);
                    $ionicLoading.show();
                    if ($scope.formData.email) {
                        if ($scope.formData.password !== '') {
                            firebase.database().ref('adminSekolah').orderByChild('email').equalTo(emailLogin).on('value', function (snapshot) {
                                if (snapshot.val()) {
                                    console.log(snapshot.val());
                                    var passwordLogin = '12345678'
                                    snapshot.forEach(function (data) {
                                        let firebaseRefKey = firebase.database().ref('adminSekolah').child(data.key);
                                        firebaseRefKey.on('value', (dataSnapShot) => {
                                            var passwordDisplay = dataSnapShot.val().passwordDisplay;
                                            console.log(passwordDisplay);
                                            if ($scope.formData.password == passwordDisplay ) {

                                            $firebaseAuth().$signInWithEmailAndPassword(emailLogin, passwordLogin).then(function (result) {
                                                $ionicLoading.hide();
                                                $state.go('menuSekolah.berandaSekolah');
                                            }).then(function (reload) {
                                                location.reload();
                                            }).catch(function (error) {
                                                var errorCode = error.code;
                                                var errorMessage = error.message;
                                                $ionicLoading.hide();

                                                if (errorCode == 'auth/user-not-found') {
                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: 'Id Akun Tidak Ditemukan',
                                                    });
                                                }
                                                else if (errorCode == 'auth/wrong-password') {
                                                    $ionicLoading.hide();
                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: 'Password tidak sesuai',
                                                    });
                                                }
                                                else {
                                                    $ionicLoading.hide();
                                                    var confirmPopup = $ionicPopup.alert({
                                                        template: errorMessage,
                                                    });
                                                }
                                            });
                                            } else {
                                                $ionicLoading.hide();
                                                var confirmPopup = $ionicPopup.alert({
                                                    template: 'Password tidak sesuai',
                                                });
                                            }
                                        })
                                    })
                                } else {
                                    firebase.database().ref('dataSekolah').orderByChild('id').equalTo($scope.formData.email).on('value', function (dataSnapShot) {
                                        if (dataSnapShot.val()) {
                                            console.log(dataSnapShot.val());
                                            dataSnapShot.forEach(function (data) {
                                                let firebaseRefKey = firebase.database().ref('dataSekolah').child(data.key);
                                                firebaseRefKey.on('value', (dataSnapShot) => {
                                                    var id = dataSnapShot.val().id;
                                                    var idSekolah = dataSnapShot.val().id_sekolah;
                                                    var password = dataSnapShot.val().password;
                                                    var passwordDisplay = dataSnapShot.val().passwordDisplay;
                                                    var sekolah = dataSnapShot.val().sekolah;
                                                    var id_kec = dataSnapShot.val().id_kecamatan

                                                    var auth = $firebaseAuth();
                                                    auth.$createUserWithEmailAndPassword(emailLogin, $scope.formData.password)
                                                        .then(function (response) {
                                                            var user = firebase.auth().currentUser;
                                                            console.log("USER ID " + user.uid)
                                                            firebase.database().ref('adminSekolah').child(user.uid).set({
                                                                nama: 'ADMIN ' + sekolah,
                                                                email: emailLogin,
                                                                id: id,
                                                                idSekolah: idSekolah,
                                                                password: password,
                                                                passwordDisplay: passwordDisplay,
                                                                uid: user.uid,
                                                                sekolah: sekolah,
                                                                id_kec: id_kec
                                                            }).then(function (response) {
                                                                firebase.database().ref('listUser').child(user.uid).set({
                                                                    status: 'sekolah',
                                                                    uid: user.uid,
                                                                }).then(function (response) {
                                                                    $ionicLoading.hide()
                                                                })
                                                            })
                                                        })
                                                })
                                            })

                                        } else {
                                            $ionicLoading.hide();
                                            var confirmPopup = $ionicPopup.alert({
                                                template: 'Id Tidak ditemukan',
                                            });
                                        }
                                    })
                                }
                            });
                        } else {
                            $ionicLoading.hide();
                            var confirmPopup = $ionicPopup.alert({
                                template: 'Password tidak boleh kosong',
                            });
                        }
                    }
                    else {
                        $ionicLoading.hide();
                        var confirmPopup = $ionicPopup.alert({
                            template: 'Email tidak valid',
                        });
                    }
                }
                $scope.kembali = function () {
                    $state.go('welcome');
                }
            }
        });

    }])

    .controller('loginGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                var useraktif = firebase.auth().currentUser;
                $ionicLoading.hide();
                $scope.nikUser = localStorage.getItem('nikUser');
                firebase.database().ref('listUser').child(useraktif.uid).on('value', function (snapshot) {

                    if (snapshot.val().status == 'guru') {
                        $state.go('menuGuru.berandaGuru');
                    } else if (snapshot.val().status == 'sekolah') {
                        $state.go('menuSekolah.berandaSekolah');
                    } else {
                        $state.go('menuAdmin.berandaAdmin');
                    }

                });

            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $scope.formData = {
                    "nik": '',
                };

                $scope.login = function () {
                    $ionicLoading.show();
                    console.log($scope.formData.nik);
                    console.log($scope.formData.password);

                    if ($scope.formData.nik) {
                        if ($scope.formData.password) {
                            console.log('gtk/' + $scope.formData.nik);
                            firebase.database().ref('gtk').child($scope.formData.nik).on('value', function (snapshot) {
                                console.log(snapshot.val());

                                if (snapshot.val()) {
                                    if ($scope.formData.password == snapshot.val().passwordDisplay) {
                                        localStorage.setItem('nikUser', $scope.formData.nik);
                                        var emailLogin = $scope.formData.nik.toString() + '@gmail.com';
                                        var passwordLogin = '12345678';
                                        console.log(emailLogin);
                                        // window.alert(email);
                                        $firebaseAuth().$signInWithEmailAndPassword(emailLogin, passwordLogin).then(function (result) {
                                            $ionicLoading.hide();
                                            $state.go('menuGuru.berandaGuru');
                                        }).then(function (reload) {
                                            location.reload();
                                        }).catch(function (error) {
                                            // Handle Errors here.
                                            var errorCode = error.code;
                                            var errorMessage = error.message;
                                            $ionicLoading.hide();

                                            if (errorCode == 'auth/user-not-found') {
                                                $firebaseAuth().$createUserWithEmailAndPassword(emailLogin, passwordLogin)
                                                    .then(function (response) {
                                                        var user = firebase.auth().currentUser;
                                                        firebase.database().ref('gtk/').child($scope.formData.nik).update({
                                                            uid: user.uid,

                                                        });

                                                        firebase.database().ref('listUser').child(user.uid).update({
                                                            uid: user.uid,
                                                            status: 'guru',
                                                            nik: $scope.formData.nik,
                                                        });
                                                        $ionicLoading.hide();
                                                    })

                                                    .catch(function (error) {
                                                        $ionicLoading.hide();
                                                        //console.log(error);
                                                        $ionicPopup.alert({
                                                            title: 'Information',
                                                            template: error.message,
                                                            okType: 'button-positive'
                                                        });
                                                    });
                                            }
                                            else if (errorCode == 'auth/wrong-password') {
                                                return window.alert('Password tidak sesuai');
                                            }
                                            else {
                                                return window.alert(errorMessage);
                                            }
                                        });
                                    } else {
                                        $ionicLoading.hide();
                                        return window.alert('Password tidak sesuai');
                                    }
                                } else {
                                    $ionicLoading.hide();
                                    return window.alert('NIK Belum terdaftar');
                                }
                            });
                        } else {
                            $ionicLoading.hide();
                            window.alert('Password tidak boleh kosong');
                        }
                    }
                    else {
                        $ionicLoading.hide();
                        window.alert('NIK tidak boleh kosong');
                    }
                }

                $scope.registrasi = function () {
                    $state.go('registrasiGuru');
                }
                $scope.kembali = function () {
                    $state.go('welcome');
                }
            }
        });

    }])

    .controller('registrasiGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth) {

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                console.log('USER AKTIF');
                var useraktif = firebase.auth().currentUser;
                console.log(useraktif.uid)
                $ionicLoading.hide();
                $state.go('menuGuru.berandaGuru');

            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $scope.formData = {
                    // DATA DIRI
                    "nama": '',
                    "jenis_kelamin": '',
                    "nik": '',
                    "tanggal_lahir": '',
                    "agama": '',
                    "id_kec": '',
                    "alamat": '',
                    "nohp": '',
                    "password": '',
                    // DATA Kepegawaian
                    "status_kepegawaian": '',
                    "nip": '',
                    "pendidikan_terakhir": '',
                    "pangkat_terakhir": '',
                    "nilai_pak": '',

                    "jenis_tempatTugas": '',
                    "statusSekolah": '-',
                    "jenjangSekolah": '',
                    "TempatTugas": '',

                    "status_jabatan": '',
                    "profesi": '',
                    "sertifikasi": '',
                    "SubunitKerja": '',
                };

                $scope.getStatusPegawai = function () {
                    var statusPegawai = $scope.formData.status_kepegawaian;
                    console.log(statusPegawai);
                    if (statusPegawai == 'honorer daerah' || statusPegawai == 'honorer sekolah') {
                        $scope.statusnip = false;
                        $scope.formData.nip = '-';
                        $scope.formData.pangkat_terakhir = '-';
                        $scope.formData.nilai_pak = 0;
                        $scope.formData.sertifikasi = 'belum'

                    }
                    else if (statusPegawai == 'kontrak') {
                        $scope.statusnip = false;
                        $scope.formData.nip = '-';
                        $scope.formData.pangkat_terakhir = '-';
                        $scope.formData.nilai_pak = 0;
                        $scope.formData.sertifikasi = 'belum'
                    }
                    else {
                        $scope.statusnip = true;
                    }
                }
                var refKecamatan = firebase.database().ref("kecamatan");
                $scope.dataKecamatan = $firebaseArray(refKecamatan);

                $scope.getJenistempatTugas = function () {
                    var tempattugas = $scope.formData.jenis_tempatTugas;
                    console.log(tempattugas);

                    if (tempattugas == 'Sekolah') {
                        $scope.jenjang = true;
                        $scope.pegawaidisdik = false;
                        $scope.jabatanKorwil = false;
                        $scope.pejabatsekolah = true;
                        $scope.sekolah = true;
                        $scope.dinas = false;
                        $scope.tampil_kecamatan = true;
                        $scope.PilihanTempatTugas = true;
                        $scope.formData.SubunitKerja = '-';


                        $scope.getIdKecamatan = function () {
                            var idKecamatan = $scope.formData.id_kec;
                            $scope.idKecamatan = $scope.formData.id_kec;
                            //Get Nama Kecamatan
                            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id").equalTo(idKecamatan);
                            var listNamaKecamatan = $firebaseArray(namaKecamatan);
                            listNamaKecamatan.$loaded().then(function (response) {
                                $scope.namaKecamatan = response[0].id;
                                console.log($scope.namaKecamatan);
                                $scope.getJenjangSekolah = function () {
                                    var jenjang = $scope.formData.jenjangSekolah;
                                    console.log(jenjang + '1');

                                    if (jenjang == 'PKBM') {
                                        $scope.pkbm = true;
                                        $scope.skb = false;
                                    } else if (jenjang == 'SKB') {
                                        $scope.skb = true;
                                        $scope.pkbm = false;
                                    } else {
                                        $scope.skb = false;
                                        $scope.pkbm = false;
                                    }
                                    $scope.jenjang = true;

                                    $scope.getJabatan = function () {
                                        var statusJabatan = $scope.formData.status_jabatan;
                                        console.log(statusJabatan);

                                        if (statusJabatan == 'Guru' && jenjang == 'SD') {
                                            $scope.ProfesiGuru = true;
                                            var refmapel = firebase.database().ref("mata_Pelajaran").orderByChild('jenjang').equalTo('SD');
                                            $scope.dataMapel = $firebaseArray(refmapel);
                                            // console.log($scope.dataMapel);
                                        } else if (statusJabatan == 'Guru' && jenjang == 'SMP') {
                                            $scope.ProfesiGuru = true;
                                            var refmapel = firebase.database().ref("mata_Pelajaran").orderByChild('jenjang').equalTo('SMP');
                                            $scope.dataMapel = $firebaseArray(refmapel);
                                        }
                                        else {
                                            $scope.ProfesiGuru = false;
                                            $scope.formData.profesi = '-';
                                        }
                                    }


                                    $scope.getStatusSekolah = function () {
                                        var statusSekolah = $scope.formData.statusSekolah;
                                        console.log(statusSekolah);
                                        $ionicLoading.show();
                                        var refSekolah = firebase.database().ref("sekolah").orderByChild('jenjang').equalTo(jenjang + '-' + idKecamatan + '-' + statusSekolah);
                                        $scope.dataSekolah = $firebaseArray(refSekolah);
                                        $ionicLoading.hide();
                                        // console.log($scope.dataSekolah);
                                        $scope.getTempatTugas = function () {
                                            var idtempatTugas = $scope.formData.TempatTugas;
                                            console.log(idtempatTugas);
                                            if (idtempatTugas == '11111') {
                                                $scope.terbuka = true;
                                            } else {
                                                $scope.terbuka = false;
                                            }
                                            // GET NAMA TEMPAT TUGAS
                                            var namaTempat = firebase.database().ref("sekolah").orderByChild("id_sekolah").equalTo(idtempatTugas);
                                            var listnamaTempat = $firebaseArray(namaTempat);
                                            listnamaTempat.$loaded().then(function (response) {
                                                $scope.namaTempatTugas = response[0].sekolah;
                                                console.log($scope.namaTempatTugas);
                                            })

                                        }
                                    }
                                }
                            });
                        }

                    } else if (tempattugas == 'Kordinator Wilayah') {
                        $scope.jenjang = false;
                        $scope.pegawaidisdik = false;
                        $scope.jabatanKorwil = true;
                        $scope.pejabatsekolah = false;
                        $scope.sekolah = false;
                        $scope.dinas = false;
                        $scope.PilihanTempatTugas = false;
                        $scope.formData.TempatTugas = "-";
                        $scope.namaTempatTugas = "Kordinator Wilayah"
                        $scope.formData.jenjangSekolah = "-";
                        $scope.formData.profesi = '-';
                        $scope.formData.SubunitKerja = '-';
                        $scope.tampil_kecamatan = true;

                        $scope.getIdKecamatan = function () {
                            var idKecamatan = $scope.formData.id_kec;
                            $scope.idKecamatan = $scope.formData.id_kec;
                            //Get Nama Kecamatan
                            var namaKecamatan = firebase.database().ref("kecamatan").orderByChild("id").equalTo(idKecamatan);
                            var listNamaKecamatan = $firebaseArray(namaKecamatan);
                            listNamaKecamatan.$loaded().then(function (response) {
                                $scope.namaKecamatan = response[0].id;
                                console.log($scope.namaKecamatan);

                            });
                        }

                    }
                    else {
                        $scope.jenjang = false;
                        $scope.pegawaidisdik = true;
                        $scope.jabatanKorwil = false;
                        $scope.pejabatsekolah = false;
                        $scope.sekolah = false;
                        $scope.dinas = true;
                        $scope.PilihanTempatTugas = true;
                        $scope.formData.TempatTugas = "-";
                        $scope.namaTempatTugas = "Disdikpora Kab Buleleng"
                        $scope.formData.jenjangSekolah = "-";
                        $scope.formData.profesi = '-';
                        $scope.tampil_kecamatan = false;
                        $scope.formData.id_kec = 'kec-buleleng';
                        $scope.formData.sertifikasi = '-'

                    }
                }

                $scope.registrasi = function () {
                    var tanggal_lahirtampil = $filter('date')($scope.formData.tanggal_lahir, 'dd-MM-yyyy');
                    var tahun_lahir = $filter('date')($scope.formData.tanggal_lahir, 'yyyy');
                    var gettahun_pensiun = parseInt(tahun_lahir) + 65
                    var tahun_pensiun = String(gettahun_pensiun);
                    var email = $scope.formData.nik + '@gmail.com';
                    var password = $scope.formData.password;

                    // console.log('1.Nama '+$scope.formData.nama);
                    // console.log('2.NIK '+String($scope.formData.nik));
                    // console.log('3.UID '+user.uid);
                    // console.log('4.Email '+email);
                    // console.log('5.IdKec '+$scope.formData.id_kec);
                    // console.log('6.Password '+password);
                    // console.log('7.Jenis_Kelamin '+$scope.formData.jenis_kelamin);
                    // console.log('8.Tgl_Lahir '+String(tanggal_lahirtampil));
                    // console.log('9.Agama '+$scope.formData.agama);
                    // console.log('10.Alamat'+$scope.formData.alamat);
                    // console.log('11.NoHp '+String($scope.formData.nohp));
                    // console.log('12.status_kepegawaian '+$scope.formData.status_kepegawaian);
                    // console.log('13.NIP '+String($scope.formData.nip));
                    // console.log('14.Pendidikan_terakhir '+$scope.formData.pendidikan_terakhir,);
                    // console.log('15.Pangkat_Terakhir '+$scope.formData.pangkat_terakhir);
                    // console.log('16.Nilai Pak '+$scope.formData.nilai_pak,);
                    // console.log('17.Jenis_TempatTugas '+$scope.formData.jenis_tempatTugas);
                    // console.log('18.jenjangSekolah '+$scope.formData.jenjangSekolah);
                    // console.log('19.namaTempatTugas '+$scope.namaTempatTugas);
                    // console.log('20.idTempatTugas '+$scope.formData.TempatTugas);
                    // console.log('21.Tahun Pensiun '+tahun_pensiun);
                    // console.log('22.sertifikasi '+$scope.formData.sertifikasi);
                    // console.log('23.Profesi Guru '+$scope.formData.profesi);
                    // console.log('24.Status Jabatan ' +$scope.formData.status_jabatan);
                    // console.log('25.Sub Unit Kerja Dinas ' +$scope.formData.SubunitKerja);

                    if ($scope.formData.nama !== '') {
                        if ($scope.formData.nik) {
                            if ($scope.formData.password) {
                                if ($scope.formData.id_kec !== '') {
                                    $ionicLoading.show();
                                    var auth = $firebaseAuth();
                                    auth.$createUserWithEmailAndPassword(email, password)
                                        .then(function (response) {
                                            var user = firebase.auth().currentUser;
                                            firebase.database().ref('guru').child($scope.formData.id_kec).child(user.uid).set({
                                                nama: $scope.formData.nama,
                                                nik: String($scope.formData.nik),
                                                uid: user.uid,
                                                email: email,
                                                id_kec: $scope.formData.id_kec,
                                                password: password,
                                                jenis_kelamin: $scope.formData.jenis_kelamin,
                                                tanggal_lahir: String(tanggal_lahirtampil),
                                                agama: $scope.formData.agama,
                                                alamat: $scope.formData.alamat,
                                                nohp: String($scope.formData.nohp),
                                                password: $scope.formData.password,

                                                status_kepegawaian: $scope.formData.status_kepegawaian,
                                                nip: String($scope.formData.nip),
                                                pendidikan_terakhir: $scope.formData.pendidikan_terakhir,
                                                pangkat_terakhir: $scope.formData.pangkat_terakhir,
                                                nilai_pak: $scope.formData.nilai_pak,

                                                jenis_tempatTugas: $scope.formData.jenis_tempatTugas,
                                                jenjangSekolah: $scope.formData.jenjangSekolah,
                                                TempatTugas: $scope.namaTempatTugas,
                                                idTempatTugas: $scope.formData.TempatTugas,
                                                tahun_pensiun: tahun_pensiun,
                                                sertifikasi: $scope.formData.sertifikasi,
                                                profesi: $scope.formData.profesi,

                                                status_jabatan: $scope.formData.status_jabatan,
                                                subUnitDinas: $scope.formData.SubunitKerja,

                                                statusSekolah: $scope.formData.statusSekolah,
                                            });

                                            firebase.database().ref('listUser').child(user.uid).set({
                                                id_kec: $scope.formData.id_kec,
                                                status: 'guru',
                                                uid: user.uid,
                                            });
                                            $ionicLoading.hide();
                                            // window.alert('Upload Berhasil');
                                            // $state.go('dashboard');
                                        })

                                        .catch(function (error) {
                                            $ionicLoading.hide();
                                            //console.log(error);
                                            $ionicPopup.alert({
                                                title: 'Information',
                                                template: error.message,
                                                okType: 'button-positive'
                                            });
                                        });
                                } else {
                                    window.alert('Kecamatan tidak boleh kosong');
                                }
                            } else {
                                window.alert('Password tidak boleh kosong');
                            }
                        } else {
                            window.alert('NIK tidak boleh kosong');
                        }

                    } else {
                        window.alert('Nama tidak boleh kosong');
                    }
                }

                $scope.kembali = function () {
                    $state.go('welcome');
                }
            }
        });

    }])

