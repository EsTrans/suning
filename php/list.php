<?php
$link = mysqli_connect("localhost","root","","test");
// 设置编码
mysqli_set_charset($link,"utf8");

$sql = "select id,title,price,img,tall from goods1";

$result = mysqli_query($link,$sql);
$rows=[];
while($row=mysqli_fetch_assoc($result)){
  $rows[]=$row;
};

// var_dump($rows);
// 把获取好的数据转换为json字符串
$rows = json_encode($rows);
echo $rows;

?>