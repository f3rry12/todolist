var gEmail;
var gNama;

var Application = {
  initApplication: function() {

$(document).on('click', '#btn-submit', function() {
  var name = document.getElementById('txt-name').value;
  var email = document.getElementById('txt-email').value;
  var pass = document.getElementById('txt-password').value;
  var repass = document.getElementById('txt-password-confirm').value;

  if (name === "" || email === "" || pass === "" || repass === "") {
    document.getElementById("snackbar").innerHTML = "isi semua field terlebih dahulu";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  } else if (pass === repass)
    Application.register(name, email, pass);
  else {
    document.getElementById("snackbar").innerHTML = "password dan repassword tidak sama";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
})

$(document).on('click', '#btn-submit-login', function() {
  var email = document.getElementById('txt-email').value;
  var pass = document.getElementById('txt-password').value;

  if (email === "" || pass === "") {
    document.getElementById("snackbar").innerHTML = "isi semua field terlebih dahulu";
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function() {
      x.className = x.className.replace("show", "");
    }, 3000);
  } else Application.login(email, pass);
})
},

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

          document.getElementById("snackbar").innerHTML = "i";
          var x = document.getElementById("snackbar");
          x.className = "show";
          setTimeout(function() {
            x.className = x.className.replace("show", "");
          }, 3000);
        }

      },
      complete: function() {
        $.mobile.loading('hide');
      }
    })
  },

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
        console.log(dataObject.value["nama"])
        if (dataObject["nama"] != null) {
          window.location.replace("./home.html");
        }
      },
      complete: function() {
        $.mobile.loading('hide');
      }
    })
  },

};

$(document).ready(function() {
  $(".card").hover(function() {
    $(this).css("background-color", "yellow");
  }, function() {
    $(this).css("background-color", "white");
  });
});

document.getElementById("namauser").innerHTML = " Selamat datang, Joel";
