<?php
    require_once("config.php");
    require_once("functions.php");

    $products = getQuery("SELECT oi.*, p.name, p.price FROM order_items AS oi LEFT JOIN products AS p ON p.idrec=oi.idproduct WHERE idorder=".$argv[1], true);

    $total = 0;
    while(check($products) && $row = $products->fetch_assoc()) {
        $total+=$row['price']?>
        <li class="row">
            <span class="name col-md-6"><?=$row['name']?></span>
            <span class="quan col-md-3"><?=$row['quantity']?></span>
            <span class="price col-md-3">$<?=number_format($row['price'], 2)?></span>
        </li>
    <?}?>

    <li><br>Total: $<?=number_format($total, 2)?></li>