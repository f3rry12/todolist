<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
try{
    $statement = $link->prepare('SELECT * from user join belanjaan on user.email=belanjaan.email');
    $statement->execute();
    $data=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}catch(Exception $e){
    echo "Data Not Found";
}

?>