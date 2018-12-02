<?php
header("Access-Control-Allow-Origin: *");
define('HOST','localhost');
define('USER','u420353749_ppk');
//sesuaikan nama user
define('PASS','rahasia');
//sesuaiakan nama password
define('DB','u420353749_tdl');
//sesuaiakan naman database
$conn = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['nama'])&& isset($_POST['email'])&& isset($_POST['password'])){
    //$QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where nama like '%".$_GET['nama']."%'");
    echo $_POST['nama']."==>".$_POST['email']."==>" .$_POST['password'];
}else{
    echo "error bang";
}

?>