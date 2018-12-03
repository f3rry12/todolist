<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
//$conn = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['aktivitas'])&& isset($_POST['email'])){
    $aktivitas=$_POST['aktivitas'];
    $email=$_POST['email'];
    try{
        $statement = $link->prepare('INSERT INTO daily (tgl,aktivitas,email)VALUES (now(), :aktivitas, :email)');
        $statement->execute([
            'aktivitas' => "$aktivitas",
            'email' => "$email",
        ]);
        echo "Success";
    }
    catch(Exception $e){
        $message=$e->getMessage();
        echo JSON_ENCODE($message);
    }
   // echo $_POST['aktivitas']."==>".$_POST['email']."==>" .$_POST['password'];
}else{
    echo "error bang";
}

?>