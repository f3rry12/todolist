<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
//$conn = mysqli_connect(HOST,USER,PASS,DB) or die('Unable to Connect');
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['tgl'])&& isset($_POST['aktivitas'])&& isset($_POST['email'])&& isset($_POST['id'])){
    $tgl=$_POST['tgl'];
    $aktivitas=$_POST['aktivitas'];
    $email=$_POST['email'];
    $id=$_POST['id'];
    try{
        $statement = $link->prepare('delete from belanjaan where id=:id');
        $statement->execute([
            'id' => "$id",
        ]);
        $statement2 = $link->prepare('INSERT INTO belanjaan (nama,harga,kuantitas,email)VALUES (:nama, :harga, :kuantitas, :email)');
        $statement2->execute([
            'nama' => "$nama",
            'harga' => "$harga",
            'kuantitas' => "$kuantitas",
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