<?php

if(isset($_POST['data'])) {
    $data=json_decode(json_encode($_POST['data']), false);
    $file = fopen('data.json', 'a+');
    $existingData = json_decode(file_get_contents('data.json'));
    if(!empty($existingData)) {
        // print_r($existingData);
        // echo '---------------------------------------------------- serparate-----------';
        // print_r($data);
        $existingData[]=$data;
        $mergedData = $existingData;
    } 
    else {
        $mergedData = array($data);
    }
    // echo '----------------------------------------------------merged data 1---------------';
    // print_r($mergedData);
    // echo '----------------------------------------------------merged data 2---------------';
    ftruncate($file, 0);
    fwrite($file, json_encode($mergedData));
    fclose($file);
}
?>


