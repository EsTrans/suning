<?php
$link = mysqli_connect("localhost","root","","test");
// 设置编码
mysqli_set_charset($link,"utf8");
$rand = mt_rand(0,138);

$sql = "select id,title,price,img from goods1 limit $rand , 140";

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