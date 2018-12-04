var gEmail;
var gNama;

var Application = {
  initApplication: function() {
    
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    // Application.initShowPlayer();
    gEmail = localStorage['gEmail'] || null;
    gNama = localStorage['gNama'] || null;   

    console.log(gEmail)
    console.log(gNama)

    $("#wellcome").html(" Selamat datang, " + gNama);


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
  },

  initDailyTodo : function () {
    $(document).on('click', '#submitDailyTodo', function() {
      var todo = document.getElementById('txt-name').value;
      var waktu = document.getElementById('txt-name').value;
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
            Application.showSnackbar("Tambah daily todo gagal");
          } else {
            window.location.replace("#homeDailyTodo");
          }
        },
        complete: function() {
          $.mobile.loading('hide');
        }
      })
    })
  },

  //coba-coba
  initShowToDoList: function () {
		$.ajax({
			url : 'http://amamipro.site/service_coba.php',
			type: 'get',
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				console.log(dataObject);
				var appendList;
				console.log(dataObject)
								for (let i = 0; i < dataObject.length; i++) {
										appendList = '<li><a href=#page-two?id='+dataObject[i].kolom1+
																'"target="_self" id="detail-obt" data-namaobt="'+dataObject[i].kolom1+'">'+dataObject[i].kolom2+'</a></li>';
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

