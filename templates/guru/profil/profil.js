angular.module('app.profilGuru', [])

    .controller('profilGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
        $scope.nikUser = localStorage.getItem('nikUser');
        console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
           // DATA DIRI
           "nama": '',
           "jenis_kelamin":'',
           "nik": '',
           "tanggal_lahir":'',
           "agama":'',
           "id_kec": '',
           "alamat":'',
           "nohp":'',
           // DATA Kepegawaian
           "status_kepegawaian": '',
           "nip":'',
           "pendidikan_terakhir":'',
           "pangkat_terakhir":'',
           "nilai_pak":'',
           "sertifikasi": '',
           "jenjangSekolah":'',
           "tahun_pensiun": '',

           "jenis_tempatTugas":'',
           "jenjangSekolah":'',
           "TempatTugas":'',
           "subUnitDinas":'',

           "status_jabatan":'',
           "id_kec": "",
        };
        $ionicLoading.hide();

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
                        firebase.database().ref('gtk').child($scope.nikUser).on("value", function (dataSnapshot) {
                            if (dataSnapshot.val() != null) {
                                $ionicLoading.hide();
                                // window.alert(dataSnapshot.val().nama);
                                $scope.formData.nama = dataSnapshot.val().nama
                                $scope.formData.nik = dataSnapshot.val().nik;
                                $scope.formData.jenis_kelamin = dataSnapshot.val().jenis_kelamin;
                                $scope.formData.tanggal_lahir = dataSnapshot.val().tanggal_lahir
                                $scope.formData.agama = dataSnapshot.val().agama,
                                $scope.formData.alamat = dataSnapshot.val().alamat
                                $scope.formData.status_kepegawaian = dataSnapshot.val().status_kepegawaian
                                $scope.formData.nip = dataSnapshot.val().nip
                                $scope.formData.pendidikan_terakhir = dataSnapshot.val().pendidikan_terakhir
                                $scope.formData.pangkat_terakhir = dataSnapshot.val().pangkat_terakhir
                                $scope.formData.nilai_pak = dataSnapshot.val().nilai_pak
                                $scope.formData.TempatTugas = dataSnapshot.val().TempatTugas
                                $scope.formData.status_jabatan = dataSnapshot.val().status_jabatan
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;

                                $scope.formData.jenis_tempatTugas = dataSnapshot.val().jenis_tempatTugas;
                                $scope.formData.sertifikasi = dataSnapshot.val().sertifikasi;
                                $scope.formData.jenjangSekolah = dataSnapshot.val().jenjangSekolah;
                                $scope.formData.nohp = dataSnapshot.val().nohp;
                                $scope.formData.tahun_pensiun = dataSnapshot.val().tahun_pensiun;
                                $scope.formData.subUnitDinas = dataSnapshot.val().subUnitDinas;

                                // Kondisi Sub Unit Dinas
                                console.log($scope.formData.jenis_tempatTugas);

                                if ($scope.formData.jenis_tempatTugas == 'Disdikpora') {
                                    $scope.statusSubunit =true;
                                } else {
                                    $scope.statusSubunit =false;
                                }

                                firebase.database().ref('gtk').child($scope.nikUser).child('fotoProfil').on("value", function (dataSnapshot) {
                                    if (dataSnapshot.val() != null) {
                                        $ionicLoading.hide();
                                        console.log('ADA BERKAS FOTO');
                                        $scope.fotoProfil = true;


                                        firebase.database().ref('gtk/' + $scope.nikUser + '/fotoProfil').on('value', function (snapshot) {
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

                $scope.editprofil = function () {
                    $state.go('menuGuru.menueditGuru');
                }

                $scope.editFotoprofil = function () {
                    $state.go('menuGuru.editFototProfilGuru');
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }
        });


    }])
    .controller('editprofilGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
        $scope.nikUser = localStorage.getItem('nikUser');
        console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
           // DATA DIRI
           "nama": '',
           "jenis_kelamin":'',
           "nik": '',
           "tanggal_lahir":'',
           "agama":'',
           "id_kec": '',
           "alamat":'',
           "nohp":'',
           // DATA Kepegawaian
           "status_kepegawaian": '',
           "nip":'',
           "pendidikan_terakhir":'',
           "pangkat_terakhir":'',
           "nilai_pak":'',

           "jenis_tempatTugas":'',
           "jenjangSekolah":'',
           "statusSekolah":'',
           "TempatTugas":'',

           "status_jabatan":'',
           "idTempatTugas":'',
           "profesi" :'',
           "sertifikasi ":'',
           "subUnitDinas ":'',
        };
        $ionicLoading.hide();

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
                        firebase.database().ref('gtk').child($scope.nikUser).on("value", function (dataSnapshot) {
                            if (dataSnapshot.val() != null) {
                                $ionicLoading.hide();
                                // window.alert(dataSnapshot.val().nama);
                                $scope.formData.nama = dataSnapshot.val().nama
                                $scope.formData.nik = dataSnapshot.val().nik;
                                $scope.formData.jenis_kelamin = dataSnapshot.val().jenis_kelamin;
                                $scope.formData.tanggal_lahir = dataSnapshot.val().tanggal_lahir;
                                $scope.formData.agama = dataSnapshot.val().agama;
                                $scope.formData.alamat = dataSnapshot.val().alamat;
                                $scope.formData.nohp = dataSnapshot.val().nohp;

                                $scope.formData.status_kepegawaian = dataSnapshot.val().status_kepegawaian;
                                $scope.formData.nip = dataSnapshot.val().nip;
                                $scope.formData.pendidikan_terakhir = dataSnapshot.val().pendidikan_terakhir;
                                $scope.formData.pangkat_terakhir = dataSnapshot.val().pangkat_terakhir;
                                $scope.formData.nilai_pak = dataSnapshot.val().nilai_pak;

                                $scope.formData.status_jabatan = dataSnapshot.val().status_jabatan;
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;
                                $scope.formData.jenis_tempatTugas = dataSnapshot.val().jenis_tempatTugas;
                                $scope.formData.jenjangSekolah = dataSnapshot.val().jenjangSekolah;

                                $scope.formData.idTempatTugas = dataSnapshot.val().idTempatTugas;
                                $scope.formData.profesi = dataSnapshot.val().profesi;
                                $scope.formData.sertifikasi = dataSnapshot.val().sertifikasi;
                                $scope.formData.subUnitDinas = dataSnapshot.val().subUnitDinas;

                                $scope.formData.statusSekolah = dataSnapshot.val().statusSekolah;
                                $scope.formData.TempatTugas = dataSnapshot.val().TempatTugas;

                                console.log($scope.formData.jenis_tempatTugas);
                                console.log($scope.formData.TempatTugas );
                                console.log($scope.formData.status_jabatan);

                                if ($scope.formData.jenis_tempatTugas == 'Sekolah') {
                                    $scope.jenjang = true;
                                    $scope.pegawaidisdik = false;
                                    $scope.pejabatsekolah = true;
                                    $scope.sekolah = true;
                                    $scope.dinas = false;
                                    
                                } else {
                                    $scope.jenjang = false;
                                    $scope.pegawaidisdik = true;
                                    $scope.pejabatsekolah = false;
                                    $scope.sekolah = false;
                                    $scope.dinas = true;
                                }

                                var refSekolah = firebase.database().ref("sekolah").orderByChild('jenjang').equalTo($scope.formData.jenjangSekolah+'-'+$scope.formData.id_kec+'-'+$scope.formData.statusSekolah);
                                $scope.dataSekolah = $firebaseArray(refSekolah);
                                // console.log($scope.dataSekolah);

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

                var refKecamatan = firebase.database().ref("kecamatan");
                $scope.dataKecamatan = $firebaseArray(refKecamatan);

                $scope.getStatusPegawai = function () {
                    var statusPegawai = $scope.formData.status_kepegawaian;
                    console.log(statusPegawai );
                    if (statusPegawai == 'honorer daerah' || statusPegawai == 'honorer sekolah') {
                        $scope.statusnip = false;
                        $scope.formData.nip = '-';
                        $scope.formData.pangkat_terakhir = '-';
                        $scope.formData.nilai_pak= 0;
                        $scope.formData.sertifikasi= 'belum'
                        
                    }
                    else if(statusPegawai == 'kontrak'){
                        $scope.statusnip = false;
                        $scope.formData.nip = '-';
                        $scope.formData.pangkat_terakhir = '-';
                        $scope.formData.nilai_pak= 0;
                        $scope.formData.sertifikasi= 'belum'
                    }
                    else {
                        $scope.statusnip = true;
                    }
                }
                var refKecamatan = firebase.database().ref("kecamatan");
                $scope.dataKecamatan = $firebaseArray(refKecamatan);
                // console.log($scope.dataKecamatan);
                // console.log($scope.formData.id_kec);

                $scope.getJenistempatTugas = function () {
                    var tempattugas = $scope.formData.jenis_tempatTugas;
                    console.log(tempattugas);

                    if (tempattugas== 'Sekolah') {
                        $scope.jenjang = true;
                        $scope.pegawaidisdik = false;
                        $scope.jabatanKorwil = false;
                        $scope.pejabatsekolah = true;
                        $scope.sekolah = true;
                        $scope.dinas = false;
                        $scope.tampil_kecamatan = true;
                        $scope.PilihanTempatTugas =true;
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
                                    console.log(jenjang);
        
        
                                    $scope.getJabatan = function () {
                                        var statusJabatan = $scope.formData.status_jabatan;
                                        console.log(statusJabatan);
        
                                        if (statusJabatan == 'Guru' && jenjang == 'SD') {
                                            $scope.ProfesiGuru =  true;
                                            var refmapel = firebase.database().ref("mata_Pelajaran").orderByChild('jenjang').equalTo('SD');
                                            $scope.dataMapel = $firebaseArray(refmapel);
                                            // console.log($scope.dataMapel);
                                        } else if(statusJabatan == 'Guru' && jenjang == 'SMP'){
                                            $scope.ProfesiGuru =  true;
                                            var refmapel = firebase.database().ref("mata_Pelajaran").orderByChild('jenjang').equalTo('SMP');
                                            $scope.dataMapel = $firebaseArray(refmapel);
                                        }
                                        else {
                                            $scope.ProfesiGuru =  false;
                                            $scope.formData.profesi = '-';
                                        }
                                    }
        
        
                                    $scope.getStatusSekolah = function () {
                                        var statusSekolah = $scope.formData.statusSekolah;
                                        console.log(statusSekolah);
                                        $ionicLoading.show();
                                        var refSekolah = firebase.database().ref("sekolah").orderByChild('jenjang').equalTo(jenjang+'-'+idKecamatan+'-'+statusSekolah);
                                        $scope.dataSekolah = $firebaseArray(refSekolah);
                                        $ionicLoading.hide();
                                        // console.log($scope.dataSekolah);
                                        $scope.getTempatTugas = function () {
                                            var idtempatTugas = $scope.formData.TempatTugas;
                                            console.log(idtempatTugas);
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
                        
                    } else if (tempattugas== 'Kordinator Wilayah') {
                        $scope.jenjang = false;
                        $scope.pegawaidisdik = false;
                        $scope.jabatanKorwil = true;
                        $scope.pejabatsekolah = false;
                        $scope.sekolah = false;
                        $scope.dinas = false;
                        $scope.PilihanTempatTugas =false;
                        $scope.formData.TempatTugas = "-";
                        $scope.namaTempatTugas= "Kordinator Wilayah"
                        $scope.formData.jenjangSekolah= "-";
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
                        $scope.PilihanTempatTugas =true;
                        $scope.formData.TempatTugas = "-";
                        $scope.namaTempatTugas= "Disdikpora Kab Buleleng"
                        $scope.formData.jenjangSekolah= "-";
                        $scope.formData.profesi = '-';
                        $scope.tampil_kecamatan = false;
                        $scope.formData.id_kec = 'kec-buleleng';
                        $scope.formData.sertifikasi ='-'
                        
                    }
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }
        });
        // console.log($scope.formData.id_kec);
        $scope.simpan = function(){
            $ionicLoading.show();
            console.log($scope.formData.nama);
            console.log($scope.formData.nik);
            console.log($scope.formData.id_kec);
            console.log($scope.formData.tanggal_lahir);
            var tanggal_lahirtampil = $filter('date')($scope.formData.tanggal_lahir, 'dd-MM-yyyy');
            
            console.log(String(tanggal_lahirtampil));
            var email = $scope.formData.nik+'@gmail.com';
            var password = String($scope.formData.nik);

            // if ($scope.formData.nama !== '') {
            //     if ($scope.formData.nik) {
            //         if ($scope.formData.id_kec !== '') {
            //             var auth = $firebaseAuth();
            //             auth.$createUserWithEmailAndPassword(email, password)
            //                 .then(function (response) {
            //                     var user = firebase.auth().currentUser;
            //                     firebase.database().ref('gtk').child($scope.formData.id_kec).child(user.uid).set({
            //                         nama: $scope.formData.nama,
            //                         nik: $scope.formData.nik,
            //                         uid: user.uid,
            //                         email:email,
            //                         id_kec:$scope.formData.id_kec,
            //                         password:password,
            //                         jenis_kelamin: $scope.formData.jenis_kelamin,
            //                         tanggal_lahir:String(tanggal_lahirtampil),
            //                         agama:$scope.formData.agama,
            //                         alamat:$scope.formData.alamat,

            //                         status_kepegawaian: $scope.formData.status_kepegawaian,
            //                         nip:$scope.formData.nip,
            //                         pendidikan_terakhir:$scope.formData.pendidikan_terakhir,
            //                         pangkat_terakhir:$scope.formData.pangkat_terakhir,
            //                         nilai_pak:$scope.formData.nilai_pak,
                
            //                         jenis_tempatTugas:$scope.formData.jenis_tempatTugas,
            //                         jenjangSekolah:$scope.formData.jenjangSekolah,
            //                         TempatTugas:$scope.formData.TempatTugas,
                
            //                         status_jabatan:$scope.formData.status_jabatan,
            //                     });

            //                     firebase.database().ref('listUser').child(user.uid).set({
            //                         id_kec:$scope.formData.id_kec,
            //                         status: 'guru',
            //                         uid: user.uid,
            //                     });
            //                     $ionicLoading.hide();
            //                     window.alert('Upload Berhasil');
            //                     // $state.go('dashboard');
            //                 })

            //                 .catch(function (error) {
            //                     $ionicLoading.hide();
            //                     //console.log(error);
            //                     $ionicPopup.alert({
            //                         title: 'Information',
            //                         template: error.message,
            //                         okType: 'button-positive'
            //                     });
            //                 });
            //         } else {
            //             window.alert('Kecamatan tidak boleh kosong');
            //         }
            //     } else {
            //         window.alert('NIK tidak boleh kosong');
            //     }
                
            // } else {
            //     window.alert('Nama tidak boleh kosong');
            // }
        }


    }])
    .controller('editFotoProfilGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $firebaseStorage) {
        $scope.nikUser = localStorage.getItem('nikUser');
        // console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
           // DATA DIRI
           "nama": '',
           "id_kec": "",
        };
        $ionicLoading.hide();

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
                                $ionicLoading.hide();
                                // window.alert(dataSnapshot.val().nama);
                                $scope.formData.nama = dataSnapshot.val().nama;
                                $scope.formData.id_kec = dataSnapshot.val().id_kec;

                                firebase.database().ref('gtk').child(snapshot.val().nik).child('fotoProfil').on("value", function (dataSnapshot) {
                                    if (dataSnapshot.val() != null) {
                                        $ionicLoading.hide();
                                        console.log('ADA BERKAS FOTO');
                                        $scope.fotoProfil = true;


                                        firebase.database().ref('guru/' +$scope.formData.id_kec + '/'+ $scope.nikUser + '/fotoProfil').on('value', function (snapshot) {
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

            $scope.UploadFotoProfil = function () {
                // File Vaksin1 
                var storageRef = firebase.storage().ref("gtk/" + $scope.nikUser + "/fotoProfil");
                var storage = $firebaseStorage(storageRef);
                var file = document.querySelector("#inputFotoProfil").files[0];

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
                            var refAddFoto = firebase.database().ref('guru/' + $scope.formData.id_kec+ '/' + $scope.nikUser + '/fotoProfil');
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
        });


    }])
    .controller('menuEditGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $firebaseStorage) {
        $scope.nikUser = localStorage.getItem('nikUser');
        // console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
            "nama": "",
            "nik": "",
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


    }])
    .controller('editPasswordGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$firebaseAuth', '$firebaseStorage', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $firebaseAuth, $firebaseStorage) {
        $scope.nikUser = localStorage.getItem('nikUser');
        // console.log($scope.nikUser);
        $ionicLoading.show();
        $scope.formData = {
            "nama": "",
            "nik": "",
            "password": "",
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
                                $scope.formData.password = dataSnapshot.val().passwordDisplay;
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

                $scope.editPassword = function () {
                    console.log($scope.formData.password);
                    if ($scope.formData.password != null) {
                        var password = $scope.formData.password;
                        firebase.database().ref('gtk/' + $scope.formData.nik).update({
                            passwordDisplay: password,
                        }).then(function () {
                            window.alert('Password Berhasil di Update')
                        });
                    } else {
                        window.alert('PASSWORD TIDAK BOLEH KOSONG')
                    }
                }
            }
            else {
                $ionicLoading.hide();
                console.log('TIDAK AKTIF');
                $state.go('welcome');
            }
        });


    }])
