<?php

require_once ('koneksi.php');
$player = [];
// if (isset($_GET['nama'])){
//   $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where nama like '%".$_GET['nama']."%'");
//   while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
//     $player[] = $data;
//   }
// } else if (isset($_GET['klub'])) {
//   $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where klub like '%".$_GET['klub']."%'");
//   while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
//     $player[] = $data;
//   }
// } else if (isset($_GET['negara'])) {
//   $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where negara like '%".$_GET['negara']."%'");
//   while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
//     $player[] = $data;
//   }
// } else if (isset($_GET['posisi'])) {
//   $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where posisi = '".$_GET['posisi']."'");
//   while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
//     $player[] = $data;
//   }
// } else if (isset($_GET['rating_min']) && isset($_GET['rating_max'])) {
//   $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player where rating between '".$_GET['rating_min']."' and '".$_GET['rating_max']."'");
//   while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
//     $player[] = $data;
//   }
// }
  $QUERY = MYSQLI_QUERY($conn,"SELECT * FROM player");
  while ($data = MYSQLI_FETCH_ASSOC($QUERY)) {
    $player[] = $data;
  }

header("Access-Control-Allow-Origin: *");
header('Content-Type:application/json;charset=utf-8');
ECHO JSON_ENCODE($player);
MYSQLI_CLOSE($conn);
 ?>
