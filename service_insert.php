<?php
header("Access-Control-Allow-Origin: *");
require_once ('koneksi.php');
if(isset($_POST['nama'])&& isset($_POST['email'])&& isset($_POST['password'])){
    //$QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where nama like '%".$_GET['nama']."%'");
    echo $_POST['nama']."==>".$_POST['email']."==>" .$_POST['password'];
}else{
    echo "error bang";
}

?>