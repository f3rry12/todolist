var gEmail;
var gNama;

let dataDaily = []

var id;

var Application = {
    initApplication: function() {

      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      gEmail = localStorage['gEmail'] || null;
      gNama = localStorage['gNama'] || null;

      console.log(gEmail)
      console.log(gNama)

      // home
      $("#wellcome").html(" Selamat datang, " + gNama);
      $("#namauser").html(gNama);


      //register button
      $(document).on('click', '#btn-submit', function() {
        var name = document.getElementById('txt-name').value;
        var email = document.getElementById('txt-email').value;
        var pass = document.getElementById('txt-password').value;
        var repass = document.getElementById('txt-password-confirm').value;

        if (name === "" || email === "" || pass === "" || repass === "") {
          Application.showSnackbar("isi semua field terlebih dahulu");
        } else if (pass === repass)
          Application.register(name, email, pass);
        else {
          Application.showSnackbar("password dan repassword tidak sama");
        }
      })

      //login button
      $(document).on('click', '#btn-submit-login', function() {
        var email = document.getElementById('txt-email').value;
        var pass = document.getElementById('txt-password').value;

        if (email === "" || pass === "") {
          Application.showSnackbar("isi semua field terlebih dahulu");
        } else Application.login(email, pass);
      })


      //button
      $(document).on('click', '#clickHome', function() {
        window.location.replace("./home.html");
      })

//--------------page daily------------------------------------------------
      //button back
      $(document).on('click', '#backToFirstPageDaily', function() {
        window.location.replace("#FirstPageDaily");
      })

      //untuk data ready
      $(document).on('pageinit', '#FirstPageDaily', function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        Application.initShowToDoList();
      })


      //detail daily button
      $(document).on('click', '#detail-daily', function() {
        id = $(this).data('idList');

        let index = 0;
        for (let i in data) {

          if (data[i].id == id) {
            index = i;
            break;
          }
        }
        document.getElementById("txt-todo-detail").value = id;
        console.log("clic detail dayly" + data[index].aktivitas)
        document.getElementById("txt-todo-detail").value = data[index].aktivitas;
        document.getElementById("txt-tgl-detail").value = data[index].tgl;
      })

      //tombol update daily
      $(document).on('click', '#updateDailyTodo', function() {
        console.log("update" + id)
        var mTodo = document.getElementById('txt-todo-detail').value;
        var mTgl = document.getElementById('txt-tgl-detail').value;
        console.log("========================= init show" + id)
        console.log("========================= init show" + gEmail)
        console.log("========================= init show" + mTgl)
        console.log("========================= init show" + mTodo)
        $.ajax({
          url: 'http://amamipro.site/updateDaily.php',
          type: 'POST',
          data: {
            id: id,
            email: gEmail,
            tgl: mTgl,
            aktivitas: mTodo
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {
            console.log(dataObject)
            if (dataObject == "Success") {
              console.log("true")

              window.location.replace("#FirstPageDaily");
              Application.initShowToDoList()
            } else {
              Application.showSnackbar("update gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
            $('#list-todo').listview("refresh");
          }
        })
      })

      //delete daily
      $(document).on('click', '#DelateDailyTodo', function() {
        console.log("delete" + id)
        $.ajax({
          url: 'http://amamipro.site/deleteDaily.php',
          type: 'POST',
          data: {
            id: id,
            email: gEmail
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {
            console.log(dataObject)
            if (dataObject == "Success") {
              console.log("true")

              window.location.replace("#FirstPageDaily");
              Application.initShowToDoList()
            } else {
              Application.showSnackbar("delete gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
            $('#list-todo').listview("refresh");
          }
        })
      })

      $(document).on('pageinit', '#FirstPageDaily', function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        Application.initApplication();
      })
    },

    initDailyTodo: function() {
      $(document).on('click', '#submitDailyTodo', function() {
        console.log(gEmail);
        var mTodo = document.getElementById('txt-todo').value;
        var mTgl = document.getElementById('txt-tgl').value;
        $.ajax({
          url: 'http://amamipro.site/setDaily.php',
          type: 'POST',
          data: {
            email: gEmail,
            tgl: mTgl,
            aktivitas: mTodo
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {
            console.log(dataObject)
            if (dataObject == "Success") {
              window.location.replace("#FirstPageDaily");
              Application.initShowToDoList()
            } else {
              Application.showSnackbar("Tambah daily todo gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
          }
        })
      })
    },

    initShowToDoList: function() {
      console.log("========================= init show " + gEmail)
      $.ajax({
        url: 'http://amamipro.site/getAktivitas.php',
        type: 'POST',
        data: {
          email: gEmail
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Please wait while retrieving data...',
            textVisible: true
          });
        },
        success: function(dataObject) {
          var appendList;
          var x;
          var obj = JSON.parse(dataObject);
          $('#list-todo').empty();
          $('#list-todo').listview('refresh');
          console.log(obj);
          for (let i = 0; i < obj.length; i++) {
            console.log("==================================== update list view " + obj[i].aktivitas);
            data = obj;
            appendList = '<li><a href=#detailTodoDaily?id=' + obj[i].id +
              '"target="_self" id="detail-daily" data-idList="' + obj[i].id + '"><h2>' + obj[i].tgl + '</h2><p>' + obj[i].aktivitas + '</p></a></li>';
            $('#list-todo').append(appendList);
            $('#list-todo').listview('refresh');
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $('#list-todo').listview("refresh");
        }
      });

    },


      //--------------akhir page daily----------------------------

    //--------------page daftar belanja------------------------------------------------
    initBelanja(){
    //button back
    $(document).on('click', '#backToFirstPageBelanja', function() {
      window.location.replace("#FirstPageBelanja");
    })

    //untuk data ready
    $(document).on('pageinit', '#FirstPageBelanja', function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      Application.initShowDaftarBelanja();
    })

    //detail daftar belanja button
    $(document).on('click', '#detail-belanja', function() {
      id = $(this).data('idListBelanja');
      console.log('=============== id ' + $(this).data('idListBelanja'))

      let index = 0;
      for (let i in data) {

        if (data[i].id == id) {
          index = i;
          break;
        }
      }
      document.getElementById("txt-nama-detail").value = data[index].nama;
      document.getElementById("txt-harga-detail").value = data[index].harga;
      document.getElementById("txt-kuan-detail").value = data[index].kuantitas;
    })

    //tombol update belanjaan belumFix
    $(document).on('click', '#updateDaftarBelanja', function() {
      var mNama = document.getElementById('txt-nama-detail').value;
      var mHarga = document.getElementById('txt-harga-detail').value;
      var mKuan = document.getElementById('txt-kuan-detail').value;

      $.ajax({
        url: 'http://amamipro.site/updateBelanjaan.php',
        type: 'POST',
        data: {
          id: id,
          email: gEmail,
          nama: mNama,
          harga: mHarga,
          kuantitas: mKuan
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Loading',
            textVisible: true
          })
        },
        success: function(dataObject) {
          console.log(dataObject)
          console.log(gEmail)
          console.log(id)
          console.log(mNama)
          console.log(mHarga)
          console.log(mKuan)
          if (dataObject == "Success") {
            console.log("true")

            window.location.replace("#FirstPageBelanja");
            Application.initShowDaftarBelanja()
          } else {
            Application.showSnackbar("update gagal");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $('#list-todo').listview("refresh");
        }
      })
    })

    //delete belanjaan
    $(document).on('click', '#DeleteDaftarBelanja', function() {
      console.log("delete" + id)
      $.ajax({
        url: 'http://amamipro.site/deleteBelanjaan.php',
        type: 'POST',
        data: {
          id: id,
          email: gEmail
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Loading',
            textVisible: true
          })
        },
        success: function(dataObject) {
          console.log(dataObject)
          if (dataObject == "Success") {
            console.log("true")

            window.location.replace("#FirstPageBelanja");
            Application.initShowDaftarBelanja()
          } else {
            Application.showSnackbar("delete gagal");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $('#list-todo').listview("refresh");
        }
      })
    })

    $(document).on('pageinit', '#FirstPageBelanja', function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      Application.initApplication();
    })
    },



  initDaftarBelanja: function() {
    $(document).on('click', '#submitBelanjaan', function() {
      console.log(gEmail);
      var mNama = document.getElementById('txt-nama').value;
      var mHarga = document.getElementById('txt-harga').value;
      var mKuan = document.getElementById('txt-kuan').value;
      $.ajax({
        url: 'http://amamipro.site/setBelanjaan.php',
        type: 'POST',
        data: {
          email: gEmail,
          nama: mNama,
          harga: mHarga,
          kuantitas: mKuan
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Loading',
            textVisible: true
          })
        },
        success: function(dataObject) {
          console.log(dataObject)
          if (dataObject == "Success") {
            window.location.replace("#FirstPageBelanja");
            Application.initShowDaftarBelanja()
          } else {
            Application.showSnackbar("Tambah daftar belanja gagal");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
        }
      })
    })
  },

  initShowDaftarBelanja: function() {
    $.ajax({
      url: 'http://amamipro.site/getShopping.php',
      type: 'POST',
      data: {
        email: gEmail
      },
      beforeSend: function() {
        $.mobile.loading('show', {
          text: 'Please wait while retrieving data...',
          textVisible: true
        });
      },
      success: function(dataObject) {
        var appendList;
        var x;
        var obj = JSON.parse(dataObject);
        $('#list-todo').empty();
        $('#list-todo').listview('refresh');
        for (let i = 0; i < obj.length; i++) {

          console.log('=============== id ' + obj[i].id)
          data = obj;
          appendList = '<li><a href=#detailBelanjaan?id=' + obj[i].id +
            '"target="_self" id="detail-belanja" data-idListBelanja="' + obj[i].id + '"><h2>' + obj[i].nama + '</h2><p>' + obj[i].kuantitas + ' buah</p></a></li>';
          $('#list-todo').append(appendList);
          $('#list-todo').listview('refresh');
        }
      },
      complete: function() {
        $.mobile.loading('hide');
        $('#list-todo').listview("refresh");
      }
    });

  },
  //--------------akhir page belanjaan----------------------------


      //--------------page daftar tugas------------------------------------------------
      initTugass(){
      //button back
      $(document).on('click', '#backToFirstPageTugas', function() {
        window.location.replace("#FirstPageTugas");
      })

      //untuk data ready
      $(document).on('pageinit', '#FirstPageTugas', function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        Application.initShowTugas();
      })

      //detail daftar tugas button
      $(document).on('click', '#detail-tugas', function() {
        id = $(this).data('idListTugas');

        let index = 0;
        for (let i in data) {

          if (data[i].id == id) {
            index = i;
            break;
          }
        }
        document.getElementById("txt-matkul-detail").value = data[index].matkul;
        document.getElementById("txt-deskripsi-detail").value = data[index].deskripsi;
        document.getElementById("txt-tenggat-detail").value = data[index].tenggat;
      })

      //tombol update tugas
      $(document).on('click', '#updateDaftarTugas', function() {
        var mMatkul = document.getElementById('txt-matkul-detail').value;
        var mDeskripsi = document.getElementById('txt-deskripsi-detail').value;
        var mTenggat = document.getElementById('txt-tenggat-detail').value;

        $.ajax({
          url: 'http://amamipro.site/updateTugas.php',
          type: 'POST',
          data: {
            id: id,
            email: gEmail,
            matkul: mMatkul,
            deskripsi: mDeskripsi,
            tenggat: mTenggat
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {

            if (dataObject == "Success") {

              window.location.replace("#FirstPageTugas");
              Application.initShowTugas()
            } else {
              Application.showSnackbar("update gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
            $('#list-todo').listview("refresh");
          }
        })
      })

      //delete tugas
      $(document).on('click', '#DeleteDaftarTugas', function() {
        console.log("delete" + id)
        $.ajax({
          url: 'http://amamipro.site/deleteTugas.php',
          type: 'POST',
          data: {
            id: id
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {
            console.log(dataObject)
            if (dataObject == "Success") {
              console.log("true")

              window.location.replace("#FirstPageTugas");
              Application.initShowTugas()
            } else {
              Application.showSnackbar("delete gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
            $('#list-todo').listview("refresh");
          }
        })
      })

      $(document).on('pageinit', '#FirstPageTugas', function() {
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        Application.initApplication();
      })
      },



    initTugas: function() {
      $(document).on('click', '#submitTugas', function() {
        console.log(gEmail);
        var mMatkul = document.getElementById('txt-matkul').value;
        var mDeskripsi = document.getElementById('txt-deskripsi').value;
        var mTenggat = document.getElementById('txt-tenggat').value;
        $.ajax({
          url: 'http://amamipro.site/setTugas.php',
          type: 'POST',
          data: {
            email: gEmail,
            matkul: mMatkul,
            deskripsi: mDeskripsi,
            tenggat: mTenggat
          },
          beforeSend: function() {
            $.mobile.loading('show', {
              text: 'Loading',
              textVisible: true
            })
          },
          success: function(dataObject) {
            if (dataObject == "Success") {
              window.location.replace("#FirstPageTugas");
              Application.initShowTugas()
            } else {
              Application.showSnackbar("Tambah daftar tugas gagal");
            }
          },
          complete: function() {
            $.mobile.loading('hide');
          }
        })
      })
    },

    initShowTugas: function() {
      $.ajax({
        url: 'http://amamipro.site/getTugas.php',
        type: 'POST',
        data: {
          email: gEmail
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Please wait while retrieving data...',
            textVisible: true
          });
        },
        success: function(dataObject) {
          var appendList;
          var x;
          var obj = JSON.parse(dataObject);
          $('#list-todo').empty();
          $('#list-todo').listview('refresh');
          for (let i = 0; i < obj.length; i++) {

            data = obj;
            appendList = '<li><a href=#detailTugas?id=' + obj[i].id +
              '"target="_self" id="detail-tugas" data-idListTugas="' + obj[i].id + '"><h2>' + obj[i].tenggat + '</h2><p>' + obj[i].matkul + '</p></a></li>';
            $('#list-todo').append(appendList);
            $('#list-todo').listview('refresh');
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $('#list-todo').listview("refresh");
        }
      });

    },
    //--------------akhir page tugas----------------------------

  //register pertukaran data
  register: function(mUsername, mEmail, mPassword) {
    console.log(mUsername + mEmail + mPassword)
    $.ajax({
      url: 'http://amamipro.site/service_register.php',
      type: 'POST',
      data: {
        nama: mUsername,
        email: mEmail,
        password: mPassword
      },
      beforeSend: function() {
        $.mobile.loading('show', {
          text: 'Loading',
          textVisible: true
        })
      },
      success: function(dataObject) {
        console.log(dataObject)
        if (dataObject == "sukses") {
          console.log("true")
          window.location.replace("./index.html");
        } else {
          Application.showSnackbar("registrasi gagal");
        }

      },
      complete: function() {
        $.mobile.loading('hide');
      }
    })
  },


  //login pertukaran data
  login: function(mEmail, mPassword) {
    $.ajax({
      url: 'http://amamipro.site/service_login.php',
      type: 'POST',
      data: {
        email: mEmail,
        password: mPassword
      },
      beforeSend: function() {
        $.mobile.loading('show', {
          text: 'Loading',
          textVisible: true
        })
      },
      success: function(dataObject) {
        console.log(dataObject)
        if (dataObject == "username or password incorrect") {
          Application.showSnackbar("login gagal");
        } else {

          var obj = JSON.parse(dataObject);
          Application.gEmail = obj.email;
          Application.gNama = obj.nama
          if (obj.email === mEmail) {
            localStorage['gEmail'] = obj.email;
            localStorage['gNama'] = obj.nama;
            window.location.replace("./home.html");
          }
        }
      },
      complete: function() {
        $.mobile.loading('hide');
      }
    })
  },

  showSnackbar: function(message) {

    document.getElementById("snackbar").innerHTML = message;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }





};




//home interface
$(document).ready(function() {
  $(".card").hover(function() {
    $(this).css("background-color", "yellow");
  }, function() {
    $(this).css("background-color", "white");
  });
});
