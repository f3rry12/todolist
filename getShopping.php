<?php
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
try{
    $email=$_POST['email'];
    $statement = $link->prepare('SELECT belanjaan.id,belanjaan.nama,belanjaan.harga,belanjaan.kuantitas from user join belanjaan on user.email=belanjaan.email where user.email= :email');
    $statement->execute([
        'email' => "$email",
    ]);
    $data=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
}catch(Exception $e){
    echo "Data Not Found";
}

?>