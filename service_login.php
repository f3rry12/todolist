<?php 
header("Access-Control-Allow-Origin: *");
$dbhost = 'localhost';
$dbname = 'u420353749_tdl';
$dbusername = 'u420353749_ppk';
$dbpassword = 'rahasia';
$link = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
date_default_timezone_set("Asia/Jakarta");
if(isset($_POST['email'])&& isset($_POST['password'])){

    $email=$_POST['email'];
    $password=$_POST['password'];
    try{
        $statement = $link->prepare('SELECT nama,email from user where email= :email and password= :password');
        $statement->execute([
            'email' => "$email",
            'password' => "$password",
        ]);
        if($statement->rowCount()==1){
            
            $user=$statement->fetch();
            $data=array();
            $data['nama']=$user['nama'];
            $data['email']=$user['email'];
            echo json_encode($data);
        }
        
        
    }
    catch(Exception $e){
        $message=$e->getMessage();
        echo JSON_ENCODE($message);
    }
}else{
    echo "error bang";
}