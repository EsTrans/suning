<?php
header("content-Type:text/html;charset=utf-8");
$name = $_GET["name"];
// $pass = $_GET["pass"];
$link = mysqli_connect("localhost","root","","test");
mysqli_set_charset($link,"utf8");
$sql = "select name from user where name='$name'";
$result = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($result);
 if($row){
  echo 1;
}else{
  echo 2;
}

?>