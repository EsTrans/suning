<?php
$val = $_GET['id'];
$link = mysqli_connect("localhost","root","","test");
// 设置编码
mysqli_set_charset($link,"utf8");

$sql = "select id,title,price,img from goods1 where id=$val";

$result = mysqli_query($link,$sql);
$rows=mysqli_fetch_assoc($result);
// 把获取好的数据转换为json字符串
$rows = json_encode($rows);
echo $rows;

?>