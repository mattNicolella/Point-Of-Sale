<?php
/**
 * Runs An Execute Query
 * @param STRING $str The Query To Run
 * @param Object $mysqliObj the mysql object to use, if none supplied, then uses page default
 */
function runQuery($str, $mysqliObj = false) {
    global $mysqli;

    if($mysqliObj === false)
        $mysqliObj = $mysqli;

    $mysqliObj->query($str);

    if(mysqli_error($mysqliObj)) {
        echo $str.PHP_EOL.mysqli_error($mysqliObj).PHP_EOL.PHP_EOL;
    }
}
/**
 * Runs A Get Query
 * @param STRING $str The Query To Run
 * @param BOOL $entireTable Whether To Return The Entire Table Or The First Row.
 * @param Object $mysqliObj the mysql object to use, if none supplied, then uses page default
 */
function getQuery($str, $entireTable = false, $mysqliObj = false) {
    global $mysqli;

    if($mysqliObj === false)
        $mysqliObj = $mysqli;

    $tmp = $mysqliObj->query($str);
    echo mysqli_error($mysqliObj);

    if($entireTable) {
        return $tmp;
    } else {
        return $tmp->fetch_assoc();
    }
}

/**
 * Check Whether Query Is Vaild So It Knows Whether Or Not To Iterate
 * @param any $res The Yielded QUery Results
 * @return bool WHether or not the query succeeded and yielded a result
 */
function check($res) {
    return ($res && $res->num_rows > 0);
}
?>