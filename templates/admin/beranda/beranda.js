angular.module('app.berandaAdmin', [])

  .controller('berandaAdminCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

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
        var pengguna = dbRef.ref('users');
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
        // $state.go('welcome');
      }
    });

    $scope.lihatdataPokok = function () {
      $state.go('menu.dataPokokGuru');
    }
    $scope.lihatdataPegawaiDinas = function () {
      $state.go('menu.dataPegawaiDinas');
    }
    $scope.lihatdataGuru = function () {
      $state.go('menu.dataGuru');
    }
    $scope.lihatdataPegawaiSekolah = function () {
      $state.go('menu.dataPegawaiSekolah');
    }
    $scope.lihatdataPensiun = function () {
      $state.go('menu.dataPensiunBaru');
    }
    $scope.updateData = function () {
      $ionicLoading.show();
      // $firebaseArray(firebase.database().ref("gtk").orderByChild("tahun_pensiun").equalTo('2021')).$loaded().then(function (response) {
      //   console.log(response.length);
      //   firebase.database().ref("jmlhDataPensiun").child('pensiun2021').set({
      //     jumlah_pensiun: response.length,
      //   })
      // }).then(function (resp) {
      //   $firebaseArray(firebase.database().ref("gtk").orderByChild("tahun_pensiun").equalTo('2022')).$loaded().then(function (response) {
      //     console.log(response.length);
      //     firebase.database().ref("jmlhDataPensiun").child('pensiun2022').set({
      //       jumlah_pensiun: response.length,
      //     })
      //   }).then(function (resp) {
      //     $firebaseArray(firebase.database().ref("gtk").orderByChild("tahun_pensiun").equalTo('2023')).$loaded().then(function (response) {
      //       console.log(response.length);
      //       firebase.database().ref("jmlhDataPensiun").child('pensiun2023').set({
      //         jumlah_pensiun: response.length,
      //       })
      //     }).then(function (resp) {
      //       $ionicLoading.hide();
      //     })
      //   })
      // })


      // HITUNG DATA GURU
      // Banjar
      firebase.database().ref('gurulist/Guru_kepala').child('kec-banjar').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    })
                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtCpnsLaki = updtCpnsLaki + 1;
                        } else {
                          updtCpnsPerempuan = updtCpnsPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      firebase.database().ref("jmlhDataGuru").child('kec-banjar').set({
                        banjar: snapshot.numChildren(),
                        honorerLaki: updtHonorerLaki,
                        honorerPerempuan: updtHonorerPerempuan,
                        kontrakLaki: updtKontrakLaki,
                        kontrakPerempuan: updtKontrakPerempuan,
                        pnsdLaki: updtPnsdLaki,
                        pnsdPerempuan: updtPnsdPerempuan,
                        pnspLaki: updtPnspLaki,
                        pnspPerempuan: updtPnspPerempuan,
                        pppkLaki: updtPppkLaki,
                        pppkPerempuan: updtPppkPerempuan,
                        gtyLaki: updtGtyLaki,
                        gtyPerempuan: updtGtyPerempuan,
                        cpnsLaki: updtCpnsLaki,
                        cpnsPerempuan: updtCpnsPerempuan,
                      });
                    })
                  });
                });
              });
            });
          });


        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-banjar').set({
            banjar: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Buleleng
      firebase.database().ref('gurulist/Guru_kepala').child('kec-buleleng').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-buleleng').set({
                          buleleng: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-buleleng').set({
            buleleng: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBuleleng = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Busungbiu
      firebase.database().ref('gurulist/Guru_kepala').child('kec-busungbiu').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;


          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-busungbiu').set({
                          busungbiu: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });
        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-busungbiu').set({
            busungbiu: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBusungbiu = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Gerokgak
      firebase.database().ref('gurulist/Guru_kepala').child('kec-gerokgak').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-gerokgak').set({
                          gerokgak: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-gerokgak').set({
            gerokgak: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Kubutambahan
      firebase.database().ref('gurulist/Guru_kepala').child('kec-kubutambahan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-kubutambahan').set({
                          kubutambahan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-kubutambahan').set({
            kubutambahan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Sawan
      firebase.database().ref('gurulist/Guru_kepala').child('kec-sawan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-sawan').set({
                          sawan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-sawan').set({
            sawan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Seririt
      firebase.database().ref('gurulist/Guru_kepala').child('kec-seririt').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-seririt').set({
                          seririt: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-seririt').set({
            seririt: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Sukasada
      firebase.database().ref('gurulist/Guru_kepala').child('kec-sukasada').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;
          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-sukasada').set({
                          sukasada: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-sukasada').set({
            sukasada: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Tejakula
      firebase.database().ref('gurulist/Guru_kepala').child('kec-tejakula').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/Guru_kepala").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataGuru").child('kec-tejakula').set({
                          tejakula: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                      $ionicLoading.hide();
                      var confirmPopup = $ionicPopup.alert({
                        // title: 'Keluar Data Centre',
                        template: 'Update berhasil',
                        // okType: 'button-positive'
                      });
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataGuru").child('kec-tejakula').set({
            tejakula: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.alert({
              // title: 'Keluar Data Centre',
              template: 'Update berhasil',
              // okType: 'button-positive'
            });
          });;
        }
      });

      // HITUNG DATA PEGAWAI SEKOLAH
      // Banjar
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-banjar').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    })
                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtCpnsLaki = updtCpnsLaki + 1;
                        } else {
                          updtCpnsPerempuan = updtCpnsPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-banjar').set({
                        banjar: snapshot.numChildren(),
                        honorerLaki: updtHonorerLaki,
                        honorerPerempuan: updtHonorerPerempuan,
                        kontrakLaki: updtKontrakLaki,
                        kontrakPerempuan: updtKontrakPerempuan,
                        pnsdLaki: updtPnsdLaki,
                        pnsdPerempuan: updtPnsdPerempuan,
                        pnspLaki: updtPnspLaki,
                        pnspPerempuan: updtPnspPerempuan,
                        pppkLaki: updtPppkLaki,
                        pppkPerempuan: updtPppkPerempuan,
                        gtyLaki: updtGtyLaki,
                        gtyPerempuan: updtGtyPerempuan,
                        cpnsLaki: updtCpnsLaki,
                        cpnsPerempuan: updtCpnsPerempuan,
                      });
                    })
                  });
                });
              });
            });
          });


        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-banjar').set({
            banjar: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Buleleng
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-buleleng').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-buleleng').set({
                          buleleng: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-buleleng').set({
            buleleng: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBuleleng = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Busungbiu
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-busungbiu').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;


          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-busungbiu').set({
                          busungbiu: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });
        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-busungbiu').set({
            busungbiu: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBusungbiu = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Gerokgak
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-gerokgak').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-gerokgak').set({
                          gerokgak: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-gerokgak').set({
            gerokgak: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Kubutambahan
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-kubutambahan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-kubutambahan').set({
                          kubutambahan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-kubutambahan').set({
            kubutambahan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Sawan
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-sawan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-sawan').set({
                          sawan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-sawan').set({
            sawan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Seririt
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-seririt').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-seririt').set({
                          seririt: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-seririt').set({
            seririt: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Sukasada
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-sukasada').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;
          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-sukasada').set({
                          sukasada: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-sukasada').set({
            sukasada: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Tejakula
      firebase.database().ref('gurulist/pegawai_sekolah').child('kec-tejakula').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_sekolah").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-tejakula').set({
                          tejakula: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                      $ionicLoading.hide();
                      var confirmPopup = $ionicPopup.alert({
                        // title: 'Keluar Data Centre',
                        template: 'Update berhasil',
                        // okType: 'button-positive'
                      });
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiSekolah").child('kec-tejakula').set({
            tejakula: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.alert({
              // title: 'Keluar Data Centre',
              template: 'Update berhasil',
              // okType: 'button-positive'
            });
          });;
        }
      });

      // HITUNG DATA PEGAWAI DISDIKPORA
      // Banjar
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-banjar').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    })
                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-banjar").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtCpnsLaki = updtCpnsLaki + 1;
                        } else {
                          updtCpnsPerempuan = updtCpnsPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-banjar').set({
                        banjar: snapshot.numChildren(),
                        honorerLaki: updtHonorerLaki,
                        honorerPerempuan: updtHonorerPerempuan,
                        kontrakLaki: updtKontrakLaki,
                        kontrakPerempuan: updtKontrakPerempuan,
                        pnsdLaki: updtPnsdLaki,
                        pnsdPerempuan: updtPnsdPerempuan,
                        pnspLaki: updtPnspLaki,
                        pnspPerempuan: updtPnspPerempuan,
                        pppkLaki: updtPppkLaki,
                        pppkPerempuan: updtPppkPerempuan,
                        gtyLaki: updtGtyLaki,
                        gtyPerempuan: updtGtyPerempuan,
                        cpnsLaki: updtCpnsLaki,
                        cpnsPerempuan: updtCpnsPerempuan,
                      });
                    })
                  });
                });
              });
            });
          });


        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-banjar').set({
            banjar: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Buleleng
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-buleleng').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-buleleng").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-buleleng').set({
                          buleleng: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-buleleng').set({
            buleleng: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBuleleng = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Busungbiu
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-busungbiu').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;


          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-busungbiu").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-busungbiu').set({
                          busungbiu: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });
        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-busungbiu').set({
            busungbiu: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
          }).then(function (resp) {

            // $scope.formData.jmlhBusungbiu = 0;
            // $scope.formData.pnspLaki = $scope.formData.pnspLaki + 0;
            // $scope.formData.pnspPerempuan = $scope.formData.pnspPerempuan + 0;
            // $scope.formData.pnsdLaki = $scope.formData.pnsdLaki + 0;
            // $scope.formData.pnsdPerempuan = $scope.formData.pnsdPerempuan + 0;
            // $scope.formData.honorerLaki = $scope.formData.honorerLaki + 0;
            // $scope.formData.honorerPerempuan = $scope.formData.honorerPerempuan + 0;
            // $scope.formData.kontrakLaki = $scope.formData.kontrakLaki + 0;
            // $scope.formData.kontrakPerempuan = $scope.formData.kontrakPerempuan + 0;
            // $scope.formData.pppkLaki = $scope.formData.pppkLaki + 0;
            // $scope.formData.pppkPerempuan = $scope.formData.pppkPerempuan + 0;

            // $scope.formData.pnspTotal = $scope.formData.pnspTotal + $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
            // $scope.formData.pnsdTotal = $scope.formData.pnsdTotal + $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
            // $scope.formData.honorerTotal = $scope.formData.honorerTotal + $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
            // $scope.formData.kontrakTotal = $scope.formData.kontrakTotal + $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
            // $scope.formData.pppkTotal = $scope.formData.pppkTotal + $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
          });
        }
      });
      //Gerokgak
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-gerokgak').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-gerokgak").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-gerokgak').set({
                          gerokgak: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-gerokgak').set({
            gerokgak: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Kubutambahan
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-kubutambahan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-kubutambahan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-kubutambahan').set({
                          kubutambahan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-kubutambahan').set({
            kubutambahan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Sawan
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-sawan').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }
                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sawan").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }
                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-sawan').set({
                          sawan: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-sawan').set({
            sawan: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
          });
        }
      });
      //Seririt
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-seririt').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-seririt").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-seririt').set({
                          seririt: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })

                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-seririt').set({
            seririt: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Sukasada
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-sukasada').on("value", function (snapshot) {
        if (snapshot.val()) {

          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;
          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-sukasada").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-sukasada').set({
                          sukasada: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-sukasada').set({
            sukasada: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {

          });
        }
      });
      //Tejakula
      firebase.database().ref('gurulist/pegawai_disdikpora').child('kec-tejakula').on("value", function (snapshot) {
        if (snapshot.val()) {
          var updtPnspLaki = 0;
          var updtPnspPerempuan = 0;
          var updtPnsdLaki = 0;
          var updtPnsdPerempuan = 0;
          var updtHonorerLaki = 0;
          var updtHonorerPerempuan = 0;
          var updtKontrakLaki = 0;
          var updtKontrakPerempuan = 0;
          var updtPppkLaki = 0;
          var updtPppkPerempuan = 0;
          var updtGtyLaki = 0;
          var updtGtyPerempuan = 0;
          var updtCpnsLaki = 0;
          var updtCpnsPerempuan = 0;

          $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsp')).$loaded().then(function (response) {
            console.log(response);
            for (i = 0; i < response.length; i++) {
              if (response[i].jenis_kelamin == 'Laki-laki') {
                updtPnspLaki = updtPnspLaki + 1;
              } else {
                updtPnspPerempuan = updtPnspPerempuan + 1;
              }
            }
          }).then(function (resp) {
            $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pnsd')).$loaded().then(function (response) {
              console.log(response);
              for (i = 0; i < response.length; i++) {
                if (response[i].jenis_kelamin == 'Laki-laki') {
                  updtPnsdLaki = updtPnsdLaki + 1;
                } else {
                  updtPnsdPerempuan = updtPnsdPerempuan + 1;
                }
              }
            }).then(function (resp) {
              $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('honorer')).$loaded().then(function (response) {
                console.log(response);
                for (i = 0; i < response.length; i++) {
                  if (response[i].jenis_kelamin == 'Laki-laki') {
                    updtHonorerLaki = updtHonorerLaki + 1;
                  } else {
                    updtHonorerPerempuan = updtHonorerPerempuan + 1;
                  }
                }
              }).then(function (resp) {
                $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('kontrak')).$loaded().then(function (response) {
                  console.log(response);
                  for (i = 0; i < response.length; i++) {
                    if (response[i].jenis_kelamin == 'Laki-laki') {
                      updtKontrakLaki = updtKontrakLaki + 1;
                    } else {
                      updtKontrakPerempuan = updtKontrakPerempuan + 1;
                    }
                  }
                }).then(function (resp) {
                  $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('pppk')).$loaded().then(function (response) {
                    console.log(response);
                    for (i = 0; i < response.length; i++) {
                      if (response[i].jenis_kelamin == 'Laki-laki') {
                        updtPppkLaki = updtPppkLaki + 1;
                      } else {
                        updtPppkPerempuan = updtPppkPerempuan + 1;
                      }
                    }

                  }).then(function (resp) {
                    $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('gty')).$loaded().then(function (response) {
                      console.log(response);
                      for (i = 0; i < response.length; i++) {
                        if (response[i].jenis_kelamin == 'Laki-laki') {
                          updtGtyLaki = updtGtyLaki + 1;
                        } else {
                          updtGtyPerempuan = updtGtyPerempuan + 1;
                        }
                      }

                    }).then(function (resp) {
                      $firebaseArray(firebase.database().ref("gurulist/pegawai_disdikpora").child("kec-tejakula").orderByChild("status_kepegawaian").equalTo('cpns')).$loaded().then(function (response) {
                        console.log(response);
                        for (i = 0; i < response.length; i++) {
                          if (response[i].jenis_kelamin == 'Laki-laki') {
                            updtCpnsLaki = updtCpnsLaki + 1;
                          } else {
                            updtCpnsPerempuan = updtCpnsPerempuan + 1;
                          }
                        }

                      }).then(function (resp) {
                        firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-tejakula').set({
                          tejakula: snapshot.numChildren(),
                          honorerLaki: updtHonorerLaki,
                          honorerPerempuan: updtHonorerPerempuan,
                          kontrakLaki: updtKontrakLaki,
                          kontrakPerempuan: updtKontrakPerempuan,
                          pnsdLaki: updtPnsdLaki,
                          pnsdPerempuan: updtPnsdPerempuan,
                          pnspLaki: updtPnspLaki,
                          pnspPerempuan: updtPnspPerempuan,
                          pppkLaki: updtPppkLaki,
                          pppkPerempuan: updtPppkPerempuan,
                          gtyLaki: updtGtyLaki,
                          gtyPerempuan: updtGtyPerempuan,
                          cpnsLaki: updtCpnsLaki,
                          cpnsPerempuan: updtCpnsPerempuan,
                        })
                      })
                      $ionicLoading.hide();
                      var confirmPopup = $ionicPopup.alert({
                        // title: 'Keluar Data Centre',
                        template: 'Update berhasil',
                        // okType: 'button-positive'
                      });
                    });
                  });
                });
              });
            });
          });

        } else {
          firebase.database().ref("jmlhDataPegawaiDisdikpora").child('kec-tejakula').set({
            tejakula: 0,
            honorerLaki: 0,
            honorerPerempuan: 0,
            kontrakLaki: 0,
            kontrakPerempuan: 0,
            pnsdLaki: 0,
            pnsdPerempuan: 0,
            pnspLaki: 0,
            pnspPerempuan: 0,
            pppkLaki: 0,
            pppkPerempuan: 0,
            gtyLaki: 0,
            gtyPerempuan: 0,
            cpnsLaki: 0,
            cpnsPerempuan: 0,
          }).then(function (resp) {
            $ionicLoading.hide();
            var confirmPopup = $ionicPopup.alert({
              // title: 'Keluar Data Centre',
              template: 'Update berhasil',
              // okType: 'button-positive'
            });
          });;
        }
      });


    }
  }])

  .controller('dataPokokGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    $ionicLoading.show();
    $scope.lihatKecBanjar = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-banjar",
      })
    }

    $scope.lihatKecBuleleng = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-buleleng",
      })
    }

    $scope.lihatKecBusungbiu = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-busungbiu",
      })
    }

    $scope.lihatKecGerokgak = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-gerokgak",
      })
    }

    $scope.lihatKecKubutambahan = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-kubutambahan",
      })
    }

    $scope.lihatKecSawan = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-sawan",
      })
    }

    $scope.lihatKecSeririt = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-seririt",
      })
    }

    $scope.lihatKecSukasada = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-sukasada",
      })
    }

    $scope.lihatKecTejakula = function () {
      $state.go("menu.dataGuruKec", {
        "idKec": "kec-tejakula",
      })
    }

    $scope.tahun2021 = function () {
      $state.go("menu.dataPensiun", {
        "tahun": "2021",
      })
    }

    $scope.tahun2022 = function () {
      $state.go("menu.dataPensiun", {
        "tahun": "2022",
      })
    }

    $scope.tahun2023 = function () {
      $state.go("menu.dataPensiun", {
        "tahun": "2023",
      })
    }

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

    $scope.formDataPegawai = {
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

    $scope.formDataPegawaiDisdik = {
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
    // JUMLAH DATA Semua
    firebase.database().ref('jmlhData').on("child_added", function (snapshot1, prevChildKey) {
      snapshot1.forEach(function (snapshot) {
        console.log(snapshot.key);

        if (snapshot.key == 'banjar') {
          $scope.formData.jmlhBanjar = snapshot.val();
        }

        if (snapshot.key == 'buleleng') {
          // window.alert(snapshot.val());
          $scope.formData.jmlhBuleleng = snapshot.val();
        }

        if (snapshot.key == 'busungbiu') {
          $scope.formData.jmlhBusungbiu = snapshot.val();
        }

        if (snapshot.key == 'gerokgak') {
          $scope.formData.jmlhGerokgak = snapshot.val();
        }

        if (snapshot.key == 'kubutambahan') {
          $scope.formData.jmlhKubutambahan = snapshot.val();
        }

        if (snapshot.key == 'sawan') {
          $scope.formData.jmlhSawan = snapshot.val();
        }

        if (snapshot.key == 'seririt') {
          $scope.formData.jmlhSeririt = snapshot.val();
        }

        if (snapshot.key == 'sukasada') {
          $scope.formData.jmlhSukasada = snapshot.val();
        }

        if (snapshot.key == 'tejakula') {
          $scope.formData.jmlhTejakula = snapshot.val();
        }
      });
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
    // JUMLAH DATA PEGAWAI SEKOLAH
    firebase.database().ref('jmlhDataPegawaiSekolah').on("child_added", function (snapshot1, prevChildKey) {
      snapshot1.forEach(function (snapshot) {
        console.log(snapshot.key);

        // if (snapshot.key == 'banjar') {
        //   $scope.formDataPegawai.jmlhBanjar = snapshot.val();
        // }

        // if (snapshot.key == 'buleleng') {
        //   // window.alert(snapshot.val());
        //   $scope.formDataPegawai.jmlhBuleleng = snapshot.val();
        // }

        // if (snapshot.key == 'busungbiu') {
        //   $scope.formDataPegawai.jmlhBusungbiu = snapshot.val();
        // }

        // if (snapshot.key == 'gerokgak') {
        //   $scope.formDataPegawai.jmlhGerokgak = snapshot.val();
        // }

        // if (snapshot.key == 'kubutambahan') {
        //   $scope.formDataPegawai.jmlhKubutambahan = snapshot.val();
        // }

        // if (snapshot.key == 'sawan') {
        //   $scope.formDataPegawai.jmlhSawan = snapshot.val();
        // }

        // if (snapshot.key == 'seririt') {
        //   $scope.formDataPegawai.jmlhSeririt = snapshot.val();
        // }

        // if (snapshot.key == 'sukasada') {
        //   $scope.formDataPegawai.jmlhSukasada = snapshot.val();
        // }

        // if (snapshot.key == 'tejakula') {
        //   $scope.formDataPegawai.jmlhTejakula = snapshot.val();
        // }



        if (snapshot.key == 'pnspLaki') {
          $scope.formDataPegawai.pnspLaki = $scope.formDataPegawai.pnspLaki + snapshot.val();
        }
        if (snapshot.key == 'pnspPerempuan') {
          $scope.formDataPegawai.pnspPerempuan = $scope.formDataPegawai.pnspPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pnsdLaki') {
          $scope.formDataPegawai.pnsdLaki = $scope.formDataPegawai.pnsdLaki + snapshot.val();
        }
        if (snapshot.key == 'pnsdPerempuan') {
          $scope.formDataPegawai.pnsdPerempuan = $scope.formDataPegawai.pnsdPerempuan + snapshot.val();
        }
        if (snapshot.key == 'honorerLaki') {
          $scope.formDataPegawai.honorerLaki = $scope.formDataPegawai.honorerLaki + snapshot.val();
        }
        if (snapshot.key == 'honorerPerempuan') {
          $scope.formDataPegawai.honorerPerempuan = $scope.formDataPegawai.honorerPerempuan + snapshot.val();
        }
        if (snapshot.key == 'kontrakLaki') {
          $scope.formDataPegawai.kontrakLaki = $scope.formDataPegawai.kontrakLaki + snapshot.val();
        }
        if (snapshot.key == 'kontrakPerempuan') {
          $scope.formDataPegawai.kontrakPerempuan = $scope.formDataPegawai.kontrakPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pppkLaki') {
          $scope.formDataPegawai.pppkLaki = $scope.formDataPegawai.pppkLaki + snapshot.val();
        }
        if (snapshot.key == 'pppkPerempuan') {
          $scope.formDataPegawai.pppkPerempuan = $scope.formDataPegawai.pppkPerempuan + snapshot.val();
        }
        if (snapshot.key == 'gtyLaki') {
          $scope.formDataPegawai.gtyLaki = $scope.formDataPegawai.gtyLaki + snapshot.val();
        }
        if (snapshot.key == 'gtyPerempuan') {
          $scope.formDataPegawai.gtyPerempuan = $scope.formDataPegawai.gtyPerempuan + snapshot.val();
        }
        if (snapshot.key == 'cpnsLaki') {
          $scope.formDataPegawai.cpnsLaki = $scope.formDataPegawai.cpnsLaki + snapshot.val();
        }
        if (snapshot.key == 'cpnsPerempuan') {
          $scope.formDataPegawai.cpnsPerempuan = $scope.formDataPegawai.cpnsPerempuan + snapshot.val();
        }
      });
      $scope.formDataPegawai.pnspTotal = $scope.formDataPegawai.pnspLaki + $scope.formDataPegawai.pnspPerempuan;
      $scope.formDataPegawai.pnsdTotal = $scope.formDataPegawai.pnsdLaki + $scope.formDataPegawai.pnsdPerempuan;
      $scope.formDataPegawai.honorerTotal = $scope.formDataPegawai.honorerLaki + $scope.formDataPegawai.honorerPerempuan;
      $scope.formDataPegawai.kontrakTotal = $scope.formDataPegawai.kontrakLaki + $scope.formDataPegawai.kontrakPerempuan;
      $scope.formDataPegawai.pppkTotal = $scope.formDataPegawai.pppkLaki + $scope.formDataPegawai.pppkPerempuan;
      $scope.formDataPegawai.gtyTotal = $scope.formDataPegawai.gtyLaki + $scope.formDataPegawai.gtyPerempuan;
      $scope.formDataPegawai.cpnsTotal = $scope.formDataPegawai.cpnsLaki + $scope.formDataPegawai.cpnsPerempuan;
      $scope.totalPegawai = $scope.formDataPegawai.pnspTotal + $scope.formDataPegawai.pnsdTotal + $scope.formDataPegawai.honorerTotal + $scope.formDataPegawai.kontrakTotal + $scope.formDataPegawai.pppkTotal + $scope.formDataPegawai.gtyTotal + $scope.formDataPegawai.cpnsTotal;
      $ionicLoading.hide();
    });

    // JUMLAH DATA PEGAWAI DISDIKPORA
    firebase.database().ref('jmlhDataPegawaiDisdikpora').on("child_added", function (snapshot1, prevChildKey) {
      snapshot1.forEach(function (snapshot) {
        console.log(snapshot.key);
        if (snapshot.key == 'pnspLaki') {
          $scope.formDataPegawaiDisdik.pnspLaki = $scope.formDataPegawaiDisdik.pnspLaki + snapshot.val();
        }
        if (snapshot.key == 'pnspPerempuan') {
          $scope.formDataPegawaiDisdik.pnspPerempuan = $scope.formDataPegawaiDisdik.pnspPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pnsdLaki') {
          $scope.formDataPegawaiDisdik.pnsdLaki = $scope.formDataPegawaiDisdik.pnsdLaki + snapshot.val();
        }
        if (snapshot.key == 'pnsdPerempuan') {
          $scope.formDataPegawaiDisdik.pnsdPerempuan = $scope.formDataPegawaiDisdik.pnsdPerempuan + snapshot.val();
        }
        if (snapshot.key == 'honorerLaki') {
          $scope.formDataPegawaiDisdik.honorerLaki = $scope.formDataPegawaiDisdik.honorerLaki + snapshot.val();
        }
        if (snapshot.key == 'honorerPerempuan') {
          $scope.formDataPegawaiDisdik.honorerPerempuan = $scope.formDataPegawaiDisdik.honorerPerempuan + snapshot.val();
        }
        if (snapshot.key == 'kontrakLaki') {
          $scope.formDataPegawaiDisdik.kontrakLaki = $scope.formDataPegawaiDisdik.kontrakLaki + snapshot.val();
        }
        if (snapshot.key == 'kontrakPerempuan') {
          $scope.formDataPegawaiDisdik.kontrakPerempuan = $scope.formDataPegawaiDisdik.kontrakPerempuan + snapshot.val();
        }
        if (snapshot.key == 'pppkLaki') {
          $scope.formDataPegawaiDisdik.pppkLaki = $scope.formDataPegawaiDisdik.pppkLaki + snapshot.val();
        }
        if (snapshot.key == 'pppkPerempuan') {
          $scope.formDataPegawaiDisdik.pppkPerempuan = $scope.formDataPegawaiDisdik.pppkPerempuan + snapshot.val();
        }
        if (snapshot.key == 'gtyLaki') {
          $scope.formDataPegawaiDisdik.gtyLaki = $scope.formDataPegawaiDisdik.gtyLaki + snapshot.val();
        }
        if (snapshot.key == 'gtyPerempuan') {
          $scope.formDataPegawaiDisdik.gtyPerempuan = $scope.formDataPegawaiDisdik.gtyPerempuan + snapshot.val();
        }
        if (snapshot.key == 'cpnsLaki') {
          $scope.formDataPegawaiDisdik.cpnsLaki = $scope.formDataPegawaiDisdik.cpnsLaki + snapshot.val();
        }
        if (snapshot.key == 'cpnsPerempuan') {
          $scope.formDataPegawaiDisdik.cpnsPerempuan = $scope.formDataPegawaiDisdik.cpnsPerempuan + snapshot.val();
        }
      });
      $scope.formDataPegawaiDisdik.pnspTotal = $scope.formDataPegawaiDisdik.pnspLaki + $scope.formDataPegawaiDisdik.pnspPerempuan;
      $scope.formDataPegawaiDisdik.pnsdTotal = $scope.formDataPegawaiDisdik.pnsdLaki + $scope.formDataPegawaiDisdik.pnsdPerempuan;
      $scope.formDataPegawaiDisdik.honorerTotal = $scope.formDataPegawaiDisdik.honorerLaki + $scope.formDataPegawaiDisdik.honorerPerempuan;
      $scope.formDataPegawaiDisdik.kontrakTotal = $scope.formDataPegawaiDisdik.kontrakLaki + $scope.formDataPegawaiDisdik.kontrakPerempuan;
      $scope.formDataPegawaiDisdik.pppkTotal = $scope.formDataPegawaiDisdik.pppkLaki + $scope.formDataPegawaiDisdik.pppkPerempuan;
      $scope.formDataPegawaiDisdik.gtyTotal = $scope.formDataPegawaiDisdik.gtyLaki + $scope.formDataPegawaiDisdik.gtyPerempuan;
      $scope.formDataPegawaiDisdik.cpnsTotal = $scope.formDataPegawaiDisdik.cpnsLaki + $scope.formDataPegawaiDisdik.cpnsPerempuan;
      $scope.totalPegawaiDisdik = $scope.formDataPegawaiDisdik.pnspTotal + $scope.formDataPegawaiDisdik.pnsdTotal + $scope.formDataPegawaiDisdik.honorerTotal + $scope.formDataPegawaiDisdik.kontrakTotal + $scope.formDataPegawaiDisdik.pppkTotal + $scope.formDataPegawaiDisdik.gtyTotal + $scope.formDataPegawaiDisdik.cpnsTotal;
      $ionicLoading.hide();
    });

    // JUMLAH DATA PENSIUN
    var dbRef = firebase.database();
    var pensiun = dbRef.ref('jmlhDataPensiun');
    pensiun.child('pensiun2021').on("value", function (snapshot) {
      // console.log(snapshot.val());
      if (snapshot.val() != null) {
        // window.alert(snapshot.val().nama);
        $scope.jumlah_pensiun2021 = snapshot.val().jumlah_pensiun;
      }
    })

    pensiun.child('pensiun2022').on("value", function (snapshot) {
      // console.log(snapshot.val());
      if (snapshot.val() != null) {
        // window.alert(snapshot.val().nama);
        $scope.jumlah_pensiun2022 = snapshot.val().jumlah_pensiun;
      }
    })

    pensiun.child('pensiun2023').on("value", function (snapshot) {
      // console.log(snapshot.val());
      if (snapshot.val() != null) {
        // window.alert(snapshot.val().nama);
        $scope.jumlah_pensiun2023 = snapshot.val().jumlah_pensiun;
      }
    })



  }])

  .controller('dataGuruKecCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
    $ionicLoading.show();
    var idKec = $stateParams.idKec;
    if (idKec == 'kec-banjar') {
      $scope.kecamatanTampil = 'Banjar';
      $scope.getTotal = 'banjar';
    } else if (idKec == 'kec-buleleng') {
      $scope.kecamatanTampil = 'Buleleng'
      $scope.getTotal = 'buleleng';
    } else if (idKec == 'kec-busungbiu') {
      $scope.kecamatanTampil = 'Busungbiu'
      $scope.getTotal = 'busungbiu';
    } else if (idKec == 'kec-gerokgak') {
      $scope.kecamatanTampil = 'Gerokgak'
      $scope.getTotal = 'gerokgak';
    } else if (idKec == 'kec-kubutambahan') {
      $scope.kecamatanTampil = 'Kubutambahan'
      $scope.getTotal = 'kubutambahan';
    } else if (idKec == 'kec-sawan') {
      $scope.kecamatanTampil = 'Sawan'
      $scope.getTotal = 'sawan';
    } else if (idKec == 'kec-seririt') {
      $scope.kecamatanTampil = 'Seririt'
      $scope.getTotal = 'seririt';
    } else if (idKec == 'kec-sukasada') {
      $scope.kecamatanTampil = 'Sukasada'
      $scope.getTotal = 'sukadasa';
    } else if (idKec == 'kec-tejakula') {
      $scope.kecamatanTampil = 'Tejakula'
      $scope.getTotal = 'tejakula';
    }

    $scope.formData = {
      "nama": "",
      "email": "",
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
        var dbRef = firebase.database();
        var pengguna = dbRef.ref('dinas');
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

    firebase.database().ref('jmlhDataGuru/' + idKec + '/' + $scope.getTotal).on('value', function (snapshot) {
      // $scope.formData.pnspLaki = snapshot.val().pnspLaki;
      $scope.totalGuru = snapshot.val();
    });

    firebase.database().ref('jmlhDataPegawaiSekolah/' + idKec + '/' + $scope.getTotal).on('value', function (snapshot) {
      // $scope.formData.pnspLaki = snapshot.val().pnspLaki;
      $scope.totalPegawaiSekolah = snapshot.val();
    });

    // firebase.database().ref('jmlhData').child(idKec).on('value', function (snapshot) {

    //   // console.log('test ', snapshot.val().pnspLaki);

    //   $scope.formData.pnspLaki = snapshot.val().pnspLaki;
    //   $scope.formData.pnspPerempuan = snapshot.val().pnspPerempuan;
    //   $scope.formData.pnsdLaki = snapshot.val().pnsdLaki;
    //   $scope.formData.pnsdPerempuan = snapshot.val().pnsdPerempuan;
    //   $scope.formData.honorerLaki = snapshot.val().honorerLaki;
    //   $scope.formData.honorerPerempuan = snapshot.val().honorerPerempuan;
    //   $scope.formData.kontrakLaki = snapshot.val().kontrakLaki;
    //   $scope.formData.kontrakPerempuan = snapshot.val().kontrakPerempuan;
    //   $scope.formData.pppkLaki = snapshot.val().pppkLaki;
    //   $scope.formData.pppkPerempuan = snapshot.val().pppkPerempuan;
    //   $scope.formData.gtyLaki = snapshot.val().gtyLaki;
    //   $scope.formData.gtyPerempuan = snapshot.val().gtyPerempuan;

    //   $scope.formData.pnspTotal = $scope.formData.pnspLaki + $scope.formData.pnspPerempuan;
    //   $scope.formData.pnsdTotal = $scope.formData.pnsdLaki + $scope.formData.pnsdPerempuan;
    //   $scope.formData.honorerTotal = $scope.formData.honorerLaki + $scope.formData.honorerPerempuan;
    //   $scope.formData.kontrakTotal = $scope.formData.kontrakLaki + $scope.formData.kontrakPerempuan;
    //   $scope.formData.pppkTotal = $scope.formData.pppkLaki + $scope.formData.pppkPerempuan;
    //   $scope.formData.gtyTotal = $scope.formData.gtyLaki + $scope.formData.gtyPerempuan;
    // });

    var ref = firebase.database().ref("guru").child(idKec);
    var listRef = $firebaseArray(ref);

    listRef.$loaded().then(function (response) {
      $scope.dataGuru = response;
      $scope.formData.totalGtk = response.length;
      $ionicLoading.hide();
    });

    var refSekolah = firebase.database().ref("sekolah");
    $scope.dataSekolah = $firebaseArray(refSekolah);

    $scope.cekFilter = function () {
      $scope.sttsFilter = $scope.formData.filterPegawai;
      $scope.formData.filterDetail = "-";
    }

    $scope.cariData = function () {

      if ($scope.sttsFilter == '-' || $scope.formData.filterDetail == '-') {
        var confirmPopup = $ionicPopup.alert({
          // title: 'Keluar Data Centre',
          template: 'Filter masih kosong',
          // okType: 'button-positive'
        });
      } else {
        $ionicLoading.show();
        $firebaseArray(firebase.database().ref("guru").child(idKec).orderByChild($scope.sttsFilter).equalTo($scope.formData.filterDetail)).$loaded().then(function (response) {
          $scope.dataGuru = response;
          $scope.formData.totalGtk = response.length;
          $ionicLoading.hide();
        });
      }

      // var filterData = [];
      // window.alert($scope.formData.sttsPegawai);
      // window.alert($scope.formData.agama);
      // window.alert($scope.formData.sttsSertif);

      // var ref = firebase.database().ref("guru").child(idKec);
      // var listRef = $firebaseArray(ref);

      // $ionicLoading.show();

      // listRef.$loaded().then(function (response) {
      //   console.log(response.length);

      //   if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas == '-') {
      //     var confirmPopup = $ionicPopup.alert({
      //       // title: 'Keluar Data Centre',
      //       template: 'Filter masih kosong',
      //       // okType: 'button-positive'
      //     });
      //     $ionicLoading.hide();
      //   } else {
      //     for (i = 0; i < response.length; i++) {
      //       if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif == '-' && $scope.formData.tmptTugas == '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif == '-' && $scope.formData.tmptTugas == '-') {
      //         if (response[i].agama == $scope.formData.agama) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas == '-') {
      //         if (response[i].sertifikasi == $scope.formData.sttsSertif) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas == '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].agama == $scope.formData.agama) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas == '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].sertifikasi == $scope.formData.sttsSertif) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas == '-') {
      //         if (response[i].agama == $scope.formData.agama && response[i].sertifikasi == $scope.formData.sttsSertif) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].agama == $scope.formData.agama && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].sertifikasi == $scope.formData.sttsSertif && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas == '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].agama == $scope.formData.agama && response[i].sertifikasi == $scope.formData.sttsSertif) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif == "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].agama == $scope.formData.agama && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama == '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].sertifikasi == $scope.formData.sttsSertif && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai == '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].agama == $scope.formData.agama && response[i].sertifikasi == $scope.formData.sttsSertif && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       } else if ($scope.formData.sttsPegawai != '-' && $scope.formData.agama != '-' && $scope.formData.sttsSertif != "-" && $scope.formData.tmptTugas != '-') {
      //         if (response[i].status_kepegawaian == $scope.formData.sttsPegawai && response[i].agama == $scope.formData.agama && response[i].sertifikasi == $scope.formData.sttsSertif && response[i].idTempatTugas == $scope.formData.tmptTugas) {
      //           filterData.push(response[i]);
      //         }
      //       }
      //     }
      //     $scope.dataGuru = filterData;
      //     $scope.formData.totalGtk = filterData.length;
      //     $ionicLoading.hide();
      //   }

      // });

    }


    $scope.detailGuru = function (data) {
      $state.go("menu.detailGuru", {
        "uid": data.$id,
        "idKec": data.id_kec,
      })
    }



  }])

  .controller('dataGuruPensiunCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {
    $ionicLoading.show();
    var tahun = localStorage.getItem('tahun_pensiun');
    $scope.tahunTampil = tahun;

    $scope.formData = {
      "nama": "",
      "email": "",
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
      "filterTempatTugas": "-",
      "filterJenjangSekolah": "-",
      "filterJabatan": "-",
      "filterGuru":"-"
    };

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

    var ref = firebase.database().ref("gtk").orderByChild('tahun_pensiun').equalTo(tahun);
    var listRef = $firebaseArray(ref);
    listRef.$loaded().then(function (response) {
      $scope.dataGuru = response;
      $scope.formData.totalGtk = response.length;
      $ionicLoading.hide();
    });

    $scope.detailGuru = function (data) {
      console.log(data.$id);
      $state.go("menu.detailGuru", {
        "id": data.$id,
      })
    }

    $scope.checkTempatTugas = function () {
      console.log($scope.formData.filterTempatTugas);
      $ionicLoading.show();
      var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunTempatTugas').equalTo(tahun + '-' + $scope.formData.filterTempatTugas);
      var listRef = $firebaseArray(ref);
      listRef.$loaded().then(function (response) {
        $scope.dataGuru = response;
        $scope.formData.totalGtk = response.length;
        $ionicLoading.hide();
      });
    }

    $scope.checkJenjangSekolah = function () {
      console.log($scope.formData.filterJenjangSekolah);
      if ($scope.formData.filterJenjangSekolah == '-') {
        $ionicLoading.show();
        var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunTempatTugas').equalTo(tahun + '-' + $scope.formData.filterTempatTugas);
        var listRef = $firebaseArray(ref);
        listRef.$loaded().then(function (response) {
          $scope.dataGuru = response;
          $scope.formData.totalGtk = response.length;
          $ionicLoading.hide();
        });
      } else {
        $ionicLoading.show();
        var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunSatdikJenjang').equalTo(tahun + '-' + $scope.formData.filterTempatTugas + '-' + $scope.formData.filterJenjangSekolah);
        var listRef = $firebaseArray(ref);
        listRef.$loaded().then(function (response) {
          $scope.dataGuru = response;
          $scope.formData.totalGtk = response.length;
          $ionicLoading.hide();
        });
      }
    }

    $scope.checkJabatanSekolah = function () {
      console.log($scope.formData.filterJabatan);
      $ionicLoading.show();
      var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunJenjangJabatan').equalTo(tahun + '-' + $scope.formData.filterTempatTugas + '-' + $scope.formData.filterJenjangSekolah + '-' + $scope.formData.filterJabatan);
      var listRef = $firebaseArray(ref);
      listRef.$loaded().then(function (response) {
        $scope.dataGuru = response;
        $scope.formData.totalGtk = response.length;
        $ionicLoading.hide();
      });
    }

    $scope.checkGuru = function () {
      console.log($scope.formData.filterGuru);
      if ($scope.formData.filterGuru == '-') {
        $ionicLoading.show();
        var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunJenjangJabatan').equalTo(tahun + '-' + $scope.formData.filterTempatTugas + '-' + $scope.formData.filterJenjangSekolah + '-' + $scope.formData.filterJabatan);
        var listRef = $firebaseArray(ref);
        listRef.$loaded().then(function (response) {
          $scope.dataGuru = response;
          $scope.formData.totalGtk = response.length;
          $ionicLoading.hide();
        });
      } else {
        $ionicLoading.show();
        var ref = firebase.database().ref("gtk").orderByChild('filter_pensiunJenjangProfesi').equalTo(tahun + '-' + $scope.formData.filterTempatTugas + '-' + $scope.formData.filterJenjangSekolah + '-' + $scope.formData.filterJabatan + '-' + $scope.formData.filterGuru);
        var listRef = $firebaseArray(ref);
        listRef.$loaded().then(function (response) {
          $scope.dataGuru = response;
          $scope.formData.totalGtk = response.length;
          $ionicLoading.hide();
        });
      }
    }



  }])

  .controller('detailGuruCtrl', ['$scope', '$stateParams', '$firebaseArray', '$firebaseObject', '$ionicPopup', '$ionicLoading', '$state', '$ionicModal', '$ionicActionSheet', '$timeout', '$filter', '$http', function ($scope, $stateParams, $firebaseArray, $firebaseObject, $ionicPopup, $ionicLoading, $state, $ionicModal, $ionicActionSheet, $timeout, $filter, $http) {

    var id = $stateParams.id;
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
        var pengguna = dbRef.ref('dinas');
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
    firebase.database().ref('gtk').child(id).on("value", function (snapshot) {
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



