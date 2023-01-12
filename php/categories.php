<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once("config.php");
require_once("functions.php");
/*if (isset($argc)) {
	for ($i = 0; $i < $argc; $i++) {
		echo "Argument #" . $i . " - " . $argv[$i] . "\n";
	}
}
else {
	echo "argc and argv disabled\n";
}*/

$res = getQuery("SELECT * FROM categories", true);

while(check($res) && $row = $res->fetch_assoc()) {?>
	<li onClick="showItems(<?=$row['idrec']?>);"><?=$row['name']?></li>
<?}?>