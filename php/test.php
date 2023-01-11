<?php
    require_once("config.php");
    require_once("functions.php");

    $arr = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'Cras', 'fringilla', 'at', 'arcu', 'a', 'tristique', 'Integer', 'vitae', 'ante', 'vitae', 'mi', 'aliquet'];

    $res = getQuery("SELECT * FROM categories", true);

    while(check($res) && $row = $res->fetch_assoc()) {
        for($i = 0; $i < 10; $i++) {
            runQuery("INSERT INTO products (name, idcategory) VALUES ('".array_shift($arr)."', ".$row['idrec'].")");
        }
    }
?>