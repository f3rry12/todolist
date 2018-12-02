<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
//$conn = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['nama'])&& isset($_POST['email'])&& isset($_POST['password'])){
    $nama=$_POST['nama'];
    $email=$_POST['email'];
    $password=$_POST['password'];
    try{
        $statement = $link->prepare('INSERT INTO user (nama,email,password)VALUES (:nama, :email, :password)');
        $statement->execute([
            'nama' => "$nama",
            'email' => "$email",
            'password' => "$password",
        ]);
        echo "Success";
    }
    catch(Exception $e){
        $message=$e->getMessage();
        echo JSON_ENCODE($message);
    }
   // echo $_POST['nama']."==>".$_POST['email']."==>" .$_POST['password'];
}else{
    echo "error bang";
}

?>