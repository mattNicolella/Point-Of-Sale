<?php
    require_once("config.php");
    require_once("functions.php");

    $res = getQuery("SELECT * FROM orders WHERE status=0", true);

    while(check($res)&&$row=$res->fetch_assoc()) {?>
        <option value="<?=$row['idrec']?>"><?=$row['idrec']?></option>
    <?}
?>