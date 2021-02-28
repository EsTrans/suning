<?php
header("content-Type:text/html;charset=utf-8");
$name = $_GET["name"];
$pass = $_GET["pass"];
$link = mysqli_connect("localhost","root","","test");
mysqli_set_charset($link,"utf8");
$sql = "insert into user(name,pass) values('$name','$pass')";
$result = mysqli_query($link,$sql);

?>