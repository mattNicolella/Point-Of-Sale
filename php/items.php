<?php
    require_once("config.php");
    require_once("functions.php");

    $res = getQuery("SELECT * FROM products", true);

while(check($res) && $row = $res->fetch_assoc()) {?>
	<li class="cat<?=$row['idcategory']?>" onClick="addToOrder(<?=$row['idrec']?>)"><?=$row['name']?></li>
<?}
?>