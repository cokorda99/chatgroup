angular.module('app.berandaAdminSekolah', [])

  .controller('berandaAdminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formData = {
      // "nip": dataSnapShot.val().nip,
      "nama": "",
      "email": "",
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
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

    $scope.lihatdataGuru = function () {
      $state.go('menuSekolah.dataGuruSekolah');
    }

    $scope.lihatdataPegawai = function () {
      $state.go('menuSekolah.dataPegawaiSekolah');
    }

    $scope.pengaturan = function () {
      $state.go('menuSekolah.pengaturanSekolah');
    }
  }])

  .controller('dataGuruAdminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
    $ionicLoading.show();
    $scope.formData = {
      "nama": "",
      "email": "",
      "idSekolahAdmin": "",
      "id_kec":"",
      "sttsSertif": "-",
      "agama": "-",
      "tmptTugas": "-",
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
      "totalGtk": 0,
      // "jenisProfesi": "-",
      "filterPegawai": "-",
      "filterDetail": "-",
    };
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        // $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
            $scope.formData.idSekolahAdmin = snapshot.val().idSekolah;
            $scope.formData.id_kec= snapshot.val().id_kec;


            console.log($scope.formData.idSekolahAdmin);
            var ref = firebase.database().ref("gtk").orderByChild('idTempatTugas').equalTo( $scope.formData.idSekolahAdmin);
            var listRef = $firebaseArray(ref);

            listRef.$loaded().then(function (response) {
              $scope.dataGuru = response;
              $scope.formData.totalGtk = response.length;
              $ionicLoading.hide();
            });
            // $ionicLoading.hide();
          } else {
            $ionicLoading.hide();
            console.log('TIDAK AKTIF');
            $state.go('welcome');
          }

        })

        // $scope.detailGuru = function (data) {
        //   $state.go("menuSekolah.dataGuruDetail", {
        //     "uid": data.$id,
        //     "idKec": data.id_kec,
        //   })
        // }
        $scope.getData = function (data) {
          console.log(data);
          $ionicActionSheet.show({
            titleText: data.nama,
            buttons: [
              { text: '<i class="icon ion-edit"></i> Edit Data' },
              { text: '<i class="icon ion-ios-people"></i>Lihat Data' },
            ],
            destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
            cancelText: 'Cancel',
            cancel: function () {
              //console.log('CANCELLED');
            },
            buttonClicked: function (index) {
              if (index === 0) {
                console.log(data.id_kec)
                $state.go('menuSekolah.dataGuruEditSekolah', {
                  "uid": data.$id,
                  "idKec": data.id_kec,
                });
              }
              if (index === 1) {
                // console.log(data.id_kec);
                $state.go('menuSekolah.detailGuruAdminSekolah', {
                  "uid": data.$id,
                  "idKec": data.id_kec,
                });
              }
              return true;
            },

            destructiveButtonClicked: function () {
              var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
              var objDelete = $firebaseObject(refObj);
              var confirmPopup = $ionicPopup.confirm({
                title: 'Hapus Data',
                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                okType: "button-positive",
              });
              confirmPopup.then(function (res) {
                if (res) {
                  objDelete.$remove().then(function (ref) {
                    //console.log('Data Berhasil Dihapus');
                  });
                }
                else {
                  //console.log('Tidak Jadi Menghapus');
                }
              });
              return true;
            }

          });
        }

        $scope.logout = function () {
          firebase.auth().signOut();
        }

        $scope.TambahData = function () {
          $state.go('menuSekolah.dataGuruTambahSekolah');
        }

      }
      else {
        $ionicLoading.hide();
        console.log('TIDAK AKTIF');
        $state.go('welcome');
      }
    });
  }])

  .controller('dataPegawaiAdminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
    $ionicLoading.show();
    $scope.formData = {
      "nama": "",
      "email": "",
      "idSekolahAdmin": "",
      "id_kec":"",
      "sttsSertif": "-",
      "agama": "-",
      "tmptTugas": "-",
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
      "totalGtk": 0,
      // "jenisProfesi": "-",
      "filterPegawai": "-",
      "filterDetail": "-",
    };
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        // $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formData.nama = snapshot.val().nama;
            $scope.formData.email = snapshot.val().email;
            $scope.formData.idSekolahAdmin = snapshot.val().idSekolah;
            $scope.formData.id_kec= snapshot.val().id_kec;


            console.log($scope.formData.idSekolahAdmin);
            var ref = firebase.database().ref("guru/"+$scope.formData.id_kec).orderByChild('filterSekolah').equalTo('pegawai_sekolah_'+$scope.formData.idSekolahAdmin);
            var listRef = $firebaseArray(ref);

            listRef.$loaded().then(function (response) {
              $scope.dataGuru = response;
              $scope.formData.totalGtk = response.length;
              $ionicLoading.hide();
            });
            // $ionicLoading.hide();
          } else {
            $ionicLoading.hide();
            console.log('TIDAK AKTIF');
            $state.go('welcome');
          }

        })

        // $scope.detailGuru = function (data) {
        //   $state.go("menuSekolah.dataGuruDetail", {
        //     "uid": data.$id,
        //     "idKec": data.id_kec,
        //   })
        // }
        $scope.getData = function (data) {
          console.log(data);
          $ionicActionSheet.show({
            titleText: data.nama,
            buttons: [
              { text: '<i class="icon ion-edit"></i> Edit Data' },
              { text: '<i class="icon ion-ios-people"></i>Lihat Data' },
            ],
            destructiveText: '<i class="icon ion-trash-b"></i> Hapus Data',
            cancelText: 'Cancel',
            cancel: function () {
              //console.log('CANCELLED');
            },
            buttonClicked: function (index) {
              if (index === 0) {
                console.log(data.id_kec)
                $state.go('menuSekolah.dataGuruEditSekolah', {
                  "uid": data.$id,
                  "idKec": data.id_kec,
                });
              }
              if (index === 1) {
                // console.log(data.id_kec);
                $state.go('menuSekolah.detailGuruAdminSekolah', {
                  "uid": data.$id,
                  "idKec": data.id_kec,
                });
              }
              return true;
            },

            destructiveButtonClicked: function () {
              var refObj = firebase.database().ref("dataSekolahIndonesia/" + data.$id);
              var objDelete = $firebaseObject(refObj);
              var confirmPopup = $ionicPopup.confirm({
                title: 'Hapus Data',
                template: 'Apakah Kamu Yakin Ingin Menghapus Data Ini?',
                okType: "button-positive",
              });
              confirmPopup.then(function (res) {
                if (res) {
                  objDelete.$remove().then(function (ref) {
                    //console.log('Data Berhasil Dihapus');
                  });
                }
                else {
                  //console.log('Tidak Jadi Menghapus');
                }
              });
              return true;
            }

          });
        }

        $scope.logout = function () {
          firebase.auth().signOut();
        }

        $scope.TambahData = function () {
          $state.go('menuSekolah.dataGuruTambahSekolah');
        }

      }
      else {
        $ionicLoading.hide();
        console.log('TIDAK AKTIF');
        $state.go('welcome');
      }
    });
  }])

  .controller('detailGuruAdminSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    var uid = $stateParams.uid;
    var idKec = $stateParams.idKec;

    $scope.formData = {
      "namaAdmin": "",
      "emailAdmin": "",

      // data lengkap
      "nama": "",
      "agama": "",
      "alamat": "",
      "tglLahir": "",
      "nohp": "",
      "tmptTugas": "",
      "jabatan": "",
      "alamat": "",
      "jenis_kelamin": "",
      "jenis_tempatTugas": "",
      "nik": "‌",
      "nilai_pak": "",
      "nip": "‌",
      "pangkat_terakhir": "",
      "pendidikan_terakhir": "",
      "profesi": "",
      "sertifikasi": "",
      "status_jabatan": "",
      "status_kepegawaian": "",
      "subUnitDinas": "",
      "tahun_pensiun": "",
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formData.namaAdmin = snapshot.val().nama;
            $scope.formData.emailAdmin = snapshot.val().email;
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


    firebase.database().ref('guru').child(idKec).child(uid).on("value", function (snapshot) {
      if (snapshot.val()) {
        $scope.formData.nama = snapshot.val().nama;
        $scope.formData.agama = snapshot.val().agama;
        $scope.formData.alamat = snapshot.val().alamat;
        $scope.formData.tglLahir = snapshot.val().tanggal_lahir;
        $scope.formData.jabatan = snapshot.val().status_jabatan;
        $scope.formData.nohp = snapshot.val().nohp;
        $scope.formData.tmptTugas = snapshot.val().TempatTugas;

        $scope.formData.jenis_kelamin = snapshot.val().jenis_kelamin;
        $scope.formData.jenis_tempatTugas = snapshot.val().jenis_tempatTugas;
        $scope.formData.nik = snapshot.val().nik;
        $scope.formData.nilai_pak = snapshot.val().nilai_pak;
        $scope.formData.nip = snapshot.val().nip;
        $scope.formData.pangkat_terakhir = snapshot.val().pangkat_terakhir;
        $scope.formData.pendidikan_terakhir = snapshot.val().pendidikan_terakhir;
        $scope.formData.profesi = snapshot.val().profesi;
        $scope.formData.sertifikasi = snapshot.val().sertifikasi;
        $scope.formData.status_jabatan = snapshot.val().status_jabatan;
        $scope.formData.status_kepegawaian = snapshot.val().status_kepegawaian;
        $scope.formData.subUnitDinas = snapshot.val().subUnitDinas;
        $scope.formData.tahun_pensiun = snapshot.val().tahun_pensiun;
      }
    });

  }])

  .controller('dataGuruTambahSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $scope.formDataAdmin = {
      // "nip": dataSnapShot.val().nip,
      "nama": "",
      "email": "",
    };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            $scope.formDataAdmin.nama = snapshot.val().nama;
            $scope.formDataAdmin.email = snapshot.val().email;

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
            // console.log($scope.dataKecamatan);
            // console.log($scope.formData.id_kec);

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
              // // console.log('3.UID '+user.uid);
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
                      firebase.database().ref('dataGuruPending').child($scope.formData.nik).set({
                        nama: $scope.formData.nama,
                        nik: String($scope.formData.nik),
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
                      }).then(function (response) {
                        $state.go('menuSekolah.dataGuruSekolah');
                        $ionicLoading.hide();
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

  }])

  .controller('dataGuruEditSekolahCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
    var uid = $stateParams.uid;
    var idKec = $stateParams.idKec;
    // $scope.formDataAdmin = {
    //   // "nip": dataSnapShot.val().nip,
    //   "nama": "",
    //   "email": "",
    // };

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log('USER AKTIF');
        var useraktif = firebase.auth().currentUser;
        console.log(useraktif.uid)
        $ionicLoading.hide();
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('adminSekolah');
        pengguna.child(useraktif.uid).on("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() != null) {
            // window.alert(snapshot.val().nama);
            // $scope.formDataAdmin.nama = snapshot.val().nama;
            // $scope.formDataAdmin.email = snapshot.val().email;

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

            console.log(uid);
            console.log(idKec);
            firebase.database().ref('guru').child(idKec).child(uid).on("value", function (snapshot) {
              if (snapshot.val()) {
                $scope.formData.nama = snapshot.val().nama;
                $scope.formData.agama = snapshot.val().agama;
                $scope.formData.alamat = snapshot.val().alamat;
                $scope.formData.tglLahir = snapshot.val().tanggal_lahir;
                $scope.formData.jabatan = snapshot.val().status_jabatan;
                $scope.formData.nohp = String(snapshot.val().nohp);
                $scope.formData.tmptTugas = snapshot.val().TempatTugas;
                $scope.formData.password = snapshot.val().password;
        
                $scope.formData.jenis_kelamin = snapshot.val().jenis_kelamin;
                $scope.formData.jenis_tempatTugas = snapshot.val().jenis_tempatTugas;
                console.log($scope.formData.jenis_tempatTugas);
                $scope.formData.nik = snapshot.val().nik;
                $scope.formData.nilai_pak = String(snapshot.val().nilai_pak);
                $scope.formData.nip = String(snapshot.val().nip);
                $scope.formData.pangkat_terakhir = snapshot.val().pangkat_terakhir;
                $scope.formData.pendidikan_terakhir = snapshot.val().pendidikan_terakhir;
                console.log($scope.formData.pendidikan_terakhir)
                $scope.formData.profesi = snapshot.val().profesi;
                $scope.formData.sertifikasi = snapshot.val().sertifikasi;
                $scope.formData.status_jabatan = snapshot.val().status_jabatan;
                $scope.formData.status_kepegawaian = snapshot.val().status_kepegawaian;
                console.log($scope.formData.status_kepegawaian)
                $scope.formData.subUnitDinas = snapshot.val().subUnitDinas;
                $scope.formData.tahun_pensiun = snapshot.val().tahun_pensiun;
                $scope.formData.id_kec = snapshot.val().id_kec;
                $scope.formData.jenjangSekolah = snapshot.val().jenjangSekolah;
                console.log($scope.formData.jenjangSekolah);

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
            });
        

            $scope.getStatusPegawai = function () {
              var statusPegawai = $scope.formData.status_kepegawaian;
              console.log(statusPegawai);
              if (statusPegawai == 'honorer') {
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
            // console.log($scope.dataKecamatan);
            // console.log($scope.formData.id_kec);

            $scope.getJenistempatTugas = function () {
              var tempattugas = $scope.formData.jenis_tempatTugas;
              console.log('TEMPAT TUGAS'+tempattugas);

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
              // // console.log('3.UID '+user.uid);
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
                      firebase.database().ref('dataGuruPending').child($scope.formData.nik).set({
                        nama: $scope.formData.nama,
                        nik: String($scope.formData.nik),
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
                      }).then(function (response) {
                        $state.go('menuSekolah.dataGuruSekolah');
                        $ionicLoading.hide();
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

  
  }])