<?php

function x_valid($x){
    return is_numeric($x) && $x > -5 && $x < 5;
}

function y_valid($y){
    $y_values = array(-4, -3, -2, -1, 0, 1, 2, 3, 4);
    return is_numeric($y) && in_array($y, $y_values);
}

function r_valid($r){
    $r_values = array(1, 2, 3, 4, 5);
    return is_numeric($r) && in_array($r, $r_values);
}

function result($x, $y, $r){
    return $x >= 0 && $y >= 0 && $x <= $r && $y <= $r ||
        $x <= 0 && $y >= 0 && $y <= 2 * $x + $r ||
        $x >= 0 && $y <= 0 && $x * $x + $y * $y <= ($r / 2) * ($r / 2);

}

session_start();
date_default_timezone_set('Europe/Moscow');
$start = microtime(true);
$x = $_REQUEST['x'].substr(0, 12);
$y = $_REQUEST['y'].substr(0, 12);
$r = $_REQUEST['r'].substr(0, 12);
$out = "";
$now = date("H:i:s");
$response = "";
if (!isset($_SESSION['data']))
    $_SESSION['data'] = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!x_valid($x)){
        header("Status: 400 Bad Request. X value is invalid", true, 400);
        exit;
    }

    if (!y_valid($y)){
        header("Status: 400 Bad Request. Y value is invalid", true, 400);
        exit;
    }

    if (!r_valid($r)){
        header("Status: 400 Bad Request. R value is invalid", true, 400);
        exit;
    }

    if (result($x, $y, $r)){
        $out = "<span style='color: lime'>True</span>";
    }else{
        $out = "<span style='color: red'>False</span>";
    }

    $calc_time = microtime(true) - $start;
    $answer = array($x, $y, $r, $out, $now, $calc_time);
    array_push($_SESSION['data'], $answer);
}
?>
<table class="result_table" align="center">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result</th>
        <th>Submit time</th>
        <th>Calc time</th>
    </tr>
    <?php foreach ($_SESSION['data'] as $word) { ?>
    <tr>
        <td><?php echo $word[0] ?></td>
        <td><?php echo $word[1] ?></td>
        <td><?php echo $word[2] ?></td>
        <td><?php echo $word[3] ?></td>
        <td><?php echo $word[4] ?></td>
        <td><?php echo number_format($word[5] * 1000000000, 0, ".", "") . " ns" ?></td>
    </tr>
    <?php } ?>
</table>
