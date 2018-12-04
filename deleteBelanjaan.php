<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
try{
    $id=$_POST['id'];
    $statement = $link->prepare('delete from belanjaan where id=:id');
    $statement->execute([
        'id' => "$id",
    ]);
   echo "Success";
}catch(Exception $e){
    echo "Data Not Found";
}

?>