<?php
$json_data = file_get_contents('php://input');
  $data = json_decode($json_data, true);
  $csvFile = 'data.csv';
  if(!empty($data)){
    if(file_exists($csvFile) && filesize("data.csv") != 0) {
        $fp = fopen($csvFile, 'a');
    } else {
        $fp = fopen($csvFile, 'w');
        fputcsv($fp, array_keys($data));
    }
    fputcsv($fp, $data);
    fclose($fp);
  }
  // Return a response to the JavaScript
//echo json_encode(array("status" => "success"))
?>

