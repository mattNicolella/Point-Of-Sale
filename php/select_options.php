<?php
    require_once("config.php");
    require_once("functions.php");

    $res = getQuery("SELECT * FROM types WHERE idkey=1 ORDER BY sort", true);

    while(check($res) && $row = $res->fetch_assoc()) {?>
        <option value="<?=$row['value']?>"><?=$row['name']?></option>
    <?}

?>