var gEmail;
var gNama;

var Application = {
	initApplication: function () {
		$(document).on('click','#detail-player',function(){
			var id_player =$(this).data('id_player');
			Application.initShowDetailPlayer(id_player);
		})

		$(document).on('click','#btn-submit',function(){
			
			var id_player =$(this).data('id_player');
			var name = document.getElementById('txt-name').value;
			var email = document.getElementById('txt-email').value;
			var pass = document.getElementById('txt-password').value;
			var repass = document.getElementById('txt-password-confirm').value;

			if(name === "" || email === "" || pass === "" || repass === ""){
				document.getElementById("snackbar").innerHTML = "isi semua field terlebih dahulu";
				var x = document.getElementById("snackbar");
				x.className = "show";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			}
			else if( pass === repass)
				Application.register(name , email , pass);
			else {
				document.getElementById("snackbar").innerHTML = "password dan repassword tidak sama";
				var x = document.getElementById("snackbar");
				x.className = "show";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			}
		})

		$(document).on('click','#btn-submit-login',function(){
			var id_player =$(this).data('id_player');
			var email = document.getElementById('txt-email').value;
			var pass = document.getElementById('txt-password').value;

			if(email === "" || pass === ""){
				document.getElementById("snackbar").innerHTML = "isi semua field terlebih dahulu";
				var x = document.getElementById("snackbar");
				x.className = "show";
				setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
			}
			else Application.login(email , pass);
		})
	},

	register : function(mUsername , mEmail , mPassword) {
		console.log(mUsername + mEmail + mPassword )
    $.ajax({
      url: 'http://amamipro.site/service_register.php',
      type: 'POST',
      data: { nama : mUsername, email : mEmail , password : mPassword} ,
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
        if(dataObject == "sukses"){
					console.log("true")
          window.location.replace("./index.html");
				} else {
					
					document.getElementById("snackbar").innerHTML = "i";
					var x = document.getElementById("snackbar");
					x.className = "show";
					setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
				}
				
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
  },

	login : function(mEmail , mPassword) {
    $.ajax({
      url: 'http://amamipro.site/service_login.php',
      type: 'POST',
      data: { email : mEmail, password : mPassword} ,
      beforeSend : function() {
        $.mobile.loading('show', {
          text : 'Loading',
          textVisible : true
        })
      },
      success : function(dataObject) {
        console.log(dataObject)
				console.log(dataObject.value["nama"])
        if(dataObject["nama"] != null){
          window.location.replace("./home.html");
        }
      },
      complete : function() {
        $.mobile.loading('hide');
      }
    })
	},
	
	search_nama : () => {
		var nama = document.getElementById('search_nama').value;
		//console.log(nama);
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			data : {'nama': nama},
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				//console.log(dataObject);
				$('#list-player').empty().append("");
				for (var i = 0; i< dataObject.length; i++){
					var appendList='<li><a href="#page-two?id='+
					dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
					dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
					'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
					$('#list-player').append(appendList);
				}
			},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-player' ).listview( "refresh" );
			}
		});
	},
	search_klub : () => {
		var klub = document.getElementById('search_klub').value;
		//console.log(nama);
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			data : {'klub': klub},
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				//console.log(dataObject);
				$('#list-player').empty().append("");
				for (var i = 0; i< dataObject.length; i++){
					var appendList='<li><a href="#page-two?id='+
					dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
					dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
					'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
					$('#list-player').append(appendList);
				}
			},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-player' ).listview( "refresh" );
			}
		});
	},
	search_negara : () => {
		var negara = document.getElementById('search_negara').value;
		//console.log(nama);
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			data : {'negara': negara},
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				//console.log(dataObject);
				$('#list-player').empty().append("");
				for (var i = 0; i< dataObject.length; i++){
					var appendList='<li><a href="#page-two?id='+
					dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
					dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
					'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
					$('#list-player').append(appendList);
				}
			},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-player' ).listview( "refresh" );
			}
		});
	},

	search_posisi : () => {
		var posisi = document.getElementById('search_posisi').value;
		//console.log(nama);
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			data : {'posisi': posisi},
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				//console.log(dataObject);
				$('#list-player').empty().append("");
				for (var i = 0; i< dataObject.length; i++){
					var appendList='<li><a href="#page-two?id='+
					dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
					dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
					'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
					$('#list-player').append(appendList);
				}
			},
			complete:function(){
						$.mobile.loading('hide');
						$( '#list-player' ).listview( "refresh" );
					}
				});
			},

			search_rating : () => {
				var rating_min = $('#range_rating').slider("values")[0];
				var rating_max = $('#range_rating').slider("values")[1];
				console.log(rating_max);
				console.log(rating_min);
				$.ajax({
					url : 'http://localhost:80/TugasPPK/web_service.php',
					type: 'get',
					data : {'rating_min': rating_min, 'rating_max': rating_max},
					beforeSend:function(){
						$.mobile.loading('show',{
							text:'Please wait while retrieving data...',
							textVisible:true
						});
					},
					success:function(dataObject){
						//console.log(dataObject);
						$('#list-player').empty().append("");
						for (var i = 0; i< dataObject.length; i++){
							var appendList='<li><a href="#page-two?id='+
							dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
							dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
							'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
							$('#list-player').append(appendList);
						}
					},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-player' ).listview( "refresh" );
			}
		});
	},


	initShowPlayer: function () {
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				console.log(dataObject);
				for (var i = 0; i< dataObject.length; i++){
					var appendList='<li><a href="#page-two?id='+
					dataObject[i].id_player+'" target="_self" id="detail-player" data-id_player="'+
					dataObject[i].id_player+'"><h2>'+dataObject[i].nama+'</h2><p>'+dataObject[i].klub+
					'</p><p><b>'+dataObject[i].rating+'</b></p></a></li>';
					$('#list-player').append(appendList);
				}

				$('list-player').listview('refresh');
			},
			complete:function(){
				$.mobile.loading('hide');
				$( '#list-player' ).listview( "refresh" );
			}
		});
	},

	tes:function(){
		console.log("1");
	},

	initShowDetailPlayer: function (id_player) {
		$.ajax({
			url : 'http://localhost:80/TugasPPK/web_service.php',
			type: 'get',
			beforeSend:function(){
				$.mobile.loading('show',{
					text:'Please wait while retrieving data...',
					textVisible:true
				});
			},
			success:function(dataObject){
				var index = -1;
				for (var i = 0; i < dataObject.length; i++) {
					if (dataObject[i].id_player == id_player) {
						index = i;
						break;
					}
				}
				$('#p-nama,#p-klub,#p-negara,#p-umur,#p-posisi,#p-rating').empty();
				$('#p-nama').append('<b>Nama: </b>'+dataObject[i].nama);
				$('#p-klub').append('<b>Klub: </b>'+dataObject[i].klub);
				$('#p-negara').append('<b>Negara: </b>'+dataObject[i].negara);
				$('#p-umur').append('<b>Umur: </b>'+dataObject[i].umur);
				$('#p-posisi').append('<b>Posisi: </b>'+dataObject[i].posisi);
				$('#p-rating').append('<b>Rating: </b>'+dataObject[i].rating);
			},
			complete:function(){
				$.mobile.loading('hide');
		}});

		// showSnackBar : function(text){
		// 	document.getElementById("snackbar").innerHTML = "isi semua field terlebih dahulu";
		// 	var x = document.getElementById("snackbar");
		// 	x.className = "show";
		// 	setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		// }
	}

};
