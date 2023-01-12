<?php
    require_once("config.php");
    require_once("functions.php");

    $res = getQuery("SELECT
    o.*,
    IFNULL(SUM(p.price * oi.quantity), 0) AS total
  FROM
    orders AS o
    LEFT JOIN order_items AS oi ON oi.idorder = o.idrec
    LEFT JOIN products AS p ON p.idrec = oi.idproduct
  WHERE status=".$argv[1]."
  GROUP BY
    o.idrec", true);?>
    
    <li data-order="0" class="row">
        <span class="col-md-6">Order Number</span>
        <span class="col-md-6">Total</span>
    </li>

    <?while(check($res) && $row = $res->fetch_assoc()) {?>
        <li data-order="<?=$row['idrec']?>" class="row">
            <span class="col-md-6"><?=$row['idrec']?></span>
            <span class="col-md-6">$<?=number_format($row['total'], 2)?></span>
        </li>
    <?}
?>