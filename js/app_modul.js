var dataObject ={"nim":"125060400111044", "nama": "Isyana Sarasvati", "jurusan": "Teknik Informatika","fakultas": "Filkom","alamat": "Jl. Suka Nyanyi","noHP": "081234567890"};

var Application = {
  initApplication : function(){
    $(window).load('pageinit','#page-one',function() {
      Application.initShowMhs();
    })
    $(document).on('click','#detail-mhs', function() {
      var nim = $(this).data('nimmhs');
      Application.initShowDetailMhs();
    })
  },

  initShowMhs : function() {
    var appendList = '<li><a href="#page-two?id='+dataObject.nim+
    '" target="_self" id="detail-mhs" data-nimmhs="'+dataObject.nim+'"><h2>'+dataObject.nama+
    '</h2><p>'+dataObject.nim+'</p><p><b>'+dataObject.fakultas+'</b></p></a></li>;'
    $('#list-mhs').append(appendList);
  },

  initShowDetailMhs : function() {
    var appendDetail="";
    var tbdy = $("#table-detailMhs tbody");
    if (dataObject.nim==nim && tbdy.children().length==0) {
      appendDetail = '<tr><td>'+dataObject.nim+'</td><td>'+dataObject.nama+
      '</td><td>'+dataObject.jurusan+'</td><td>'+dataObject.fakultas+'</td><td>'+
      dataObject.alamat+'</td><td>'+dataObject.noHP+'</td></tr>';
    };
    $('table-detailMhs').append(appendDetail);
  }
// };
//
// var dataObject=[{"nim":"125060400111044", "nama": "Isyana Sarasvati", "jurusan": "Teknik Informatika","fakultas": "Filkom","alamat": "Jl. Suka Nyanyi","noHP": "081234567890"},
// {"nim":"135060401111005", "nama": "Marion Jola", "jurusan": "komunikasi","fakultas": "FISIP","alamat": "Kec. Wakanda","noHP": "08765432109"},
// {"nim":"165150200111105", "nama": "Alexander Krisna Giri", "jurusan": "Teknik Informatika","fakultas": "Filkom","alamat": "MT Haryono Gang 2/491","noHP": "085716747958"}]
// var Application = {
//     initApplication : function(){
//         $(window).load('pageinit','#page-one',function(){
//             Application.initShowMhs();
//         })
//         $(document).on('click','#detail-mhs',function(){
//             var nim = $(this).data('nimmhs');
//             Application.initShowDetailMhs(nim);
//
//             $('#list-mhs').append(appendList);
//         })
//         },
//         initShowMhs : function(){
//             var count=0;
//             while(dataObject[count].nim){
//                 var appendList = '<li> <a href="#page-two?id='+dataObject[count].nim+'" target="_self" id="detail-mhs" data-nimmhs="'+dataObject[count].nim+'">\
//                 <h2>'+dataObject[count].nama+'</h2><p>' + dataObject[count].nim+'</p><p><b>'+dataObject[count].fakultas+'</b></p></a></li>'
//                 $('#list-mhs').append(appendList);
//                 count++;
//             }
//
//         },
//
//         initShowDetailMhs : function(nim){
//             var appendDetail="";
//             var count2=0;
//             var tbdy=$("#table-detailMhs tbody");
//               if(tbdy.children().length>0){
//                  tbdy.empty();
//                  }
//             while(dataObject[count2].nim){
//                 if(dataObject[count2].nim==nim && tbdy.children().length==0){
//                 appendDetail='<tr><td>'+dataObject[count2].nim+'</td><td>'+dataObject[count2].nama+
//                 '</td><td>'+dataObject[count2].jurusan+'</td><td>'+dataObject[count2].fakultas+'</td><td>'+dataObject[count2].alamat+'</td><td>'+dataObject[count2].noHP+'</td></tr>';
//                 $('#table-detailMhs').append(appendDetail);
//                 count2=0;
//             }else{
//                   count2++;
//             }
//         }
//     }}
