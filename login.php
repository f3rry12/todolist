<?php 
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
//$conn = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['email'])&& isset($_POST['password'])){

    $email=$_POST['email'];
    $password=$_POST['password'];
    try{
        $statement = $link->prepare('SELECT nama, email from user where email=:email password=:password');
        $statement->execute([
            'email' => "$email",
            'password' => "$password",
        ]);
        if($statement->rowCount()==1){
            echo "Login Success";
        }
    }
    catch(Exception $e){
        $message=$e->getMessage();
        echo JSON_ENCODE($message);
    }
   // echo $_POST['nama']."==>".$_POST['email']."==>" .$_POST['password'];
}else{
    echo "error bang";
}