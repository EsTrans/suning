<?php
header("Content-Type:text/html;charset=utf-8");
$name = $_GET["name"];
$pass = $_GET["pass"];
$link = mysqli_connect("localhost","root","","test");
$sql = "select * from user where name='$name' and  pass='$pass'";
mysqli_set_charset($link,"utf8");
$res = mysqli_query($link,$sql);
$row = mysqli_fetch_assoc($res);
 if($row){
  echo '1';
}else{
  echo '2';
}
?>