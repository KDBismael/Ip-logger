<?php

if(isset($_POST['data'])) {
    $data=json_decode(json_encode($_POST['data']), false);
    $file = fopen('data.json', 'a+');
    $existingData = json_decode(file_get_contents('data.json'));
    if(!empty($existingData)) {
        $existingData[]=$data;
        $mergedData = $existingData;
    } 
    else {
        $mergedData = array($data);
    }
    ftruncate($file, 0);
    fwrite($file, json_encode($mergedData));
    fclose($file);
}
?>


