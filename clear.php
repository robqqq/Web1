<?php
session_start();
if (isset($_SESSION['data'])) {
    $_SESSION['data'] = array();
}
?>
<table class="result_table" align="center">
    <tr>
        <th class="variable">X</th>
        <th class="variable">Y</th>
        <th class="variable">R</th>
        <th>Result<th>
        <th>Submit time</th>
        <th>Calc time</th>
    </tr>
</table>