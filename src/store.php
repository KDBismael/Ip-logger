<?php

if(isset($_POST['data'])) {
    $csvFile = 'data.csv';
    $data = json_decode($_POST['data'], true);
    if(file_exists($csvFile) && filesize("data.csv") != 0) {
    $fp = fopen($csvFile, 'a');
    } else {
    $fp = fopen($csvFile, 'w');
    fputcsv($fp, array_keys($data));
    }
    fputcsv($fp, $data);
    fclose($fp);
}
?>

