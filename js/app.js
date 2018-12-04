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

    $("#wellcome").html(" Selamat datang, " + gNama);
    $("#namauser").html(gNama);


    //register
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

    //login
    $(document).on('click', '#btn-submit-login', function() {
      var email = document.getElementById('txt-email').value;
      var pass = document.getElementById('txt-password').value;

      if (email === "" || pass === "") {
        Application.showSnackbar("isi semua field terlebih dahulu");
      } else Application.login(email, pass);
    })

    

    $(document).on('click', '#clickHome', function() {
      window.location.replace("./home.html");
    })

    $(document).on('click', '#backToDailyHome', function() {
      window.location.replace("#homeDailyTodo");
    })

    $(document).on('pageinit', '#homeDailyTodo', function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      Application.initShowToDoList();
    })

    $(document).on('click', '#detail-daily', function() {
      id = $(this).data('namaobt');
      
      let index = 0
      for (let i in data){
        
        if (data[i].id == id) {
          index = i
          break
        }
      }
      document.getElementById("txt-todo-detail").value = id;    
      console.log("clic detail dayly"+ data[index].aktivitas)
        document.getElementById("txt-todo-detail").value = data[index].aktivitas;    
        

    })
      
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
          tgl : mTgl,
          aktivitas: mTodo
        },
        beforeSend: function() {
          $.mobile.loading('show', {
            text: 'Loading',
            textVisible: true
          })
        },
        success: function(dataObject) {console.log(dataObject)
          if (dataObject == "Success") {
            console.log("true")
            
            window.location.replace("#homeDailyTodo");
            Application.initShowToDoList()
          } else {
            Application.showSnackbar("update gagal");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $( '#list-todo' ).listview( "refresh" );
        }
      })
    })

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
        success: function(dataObject) {console.log(dataObject)
          if (dataObject == "Success") {
            console.log("true")
            
            window.location.replace("#homeDailyTodo");
            Application.initShowToDoList()
          } else {
            Application.showSnackbar("delete gagal");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
          $( '#list-todo' ).listview( "refresh" );
        }
      })
    })

    $(document).on('pageinit', '#first-page', function() {
      $.support.cors = true;
      $.mobile.allowCrossDomainPages = true;
      Application.initApplication();
    })
  },

  initDailyTodo : function () {
    $(document).on('click', '#submitDailyTodo', function() {
      console.log(gEmail);
      var mTodo = document.getElementById('txt-todo').value;
      var mTgl = document.getElementById('txt-tgl').value;
      $.ajax({
        url: 'http://amamipro.site/setDaily.php',
        type: 'POST',
        data: {
          email: gEmail,
          tgl : mTgl,
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
            window.location.replace("#homeDailyTodo");
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

  initShowToDoList: function () {
    console.log("========================= init show "+gEmail)
		$.ajax({
			url : 'http://amamipro.site/getAktivitas.php',
			type: 'POST',
      data:
      {
        email: gEmail
      },
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				var appendList;
        var x;
        var obj = JSON.parse(dataObject);
        $('#list-todo').empty();
        $('#list-todo').listview('refresh');
        console.log(obj);
      								for (let i = 0; i < obj.length; i++) {
                  console.log("==================================== update list view "+obj[i].aktivitas);
                  data = obj;
                  appendList = '<li><a href=#detailTodoDaily?id='+obj[i].id+
                  '"target="_self" id="detail-daily" data-namaobt="'+obj[i].id+'"><h2>'+obj[i].tgl+'</h2><p>'+obj[i].aktivitas+'</p></a></li>';
                  $('#list-todo').append(appendList);
                  $('#list-todo').listview('refresh');
								}
			},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-todo' ).listview( "refresh" );
			}
		});

	},
  
  //register
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


  //login
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

  showSnackbar: function(message){
    
    document.getElementById("snackbar").innerHTML = message;
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }





};





$(document).ready(function() {
  $(".card").hover(function() {
    $(this).css("background-color", "yellow");
  }, function() {
    $(this).css("background-color", "white");
  });
});

// document.getElementById("namauser").innerHTML = gNama;
// document.getElementById("wellcome").innerHTML = " Selamat datang," + gEmail;

