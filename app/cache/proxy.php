<?php
header('Content-Type: application/json');
$file_name = '../aggr.json';
$file = file_get_contents($file_name);
$date = filemtime($file_name);

function write_json($feed, $data){
    global $file_name, $date;
    $file_write = false;
    $data = json_decode($data);
    $feeds = json_decode(file_get_contents($file_name));
    if($feeds){
        $feeds->$feed = $data;
    } else {
        $feeds = new stdClass();
        $feeds->$feed = $data;
    }
    if($feeds->$feed[0]){
        $file_write = file_put_contents($file_name, json_encode($feeds, JSON_PRETTY_PRINT));
    }
    if($file_write === false) {
        return $error = 'There was an error writing this file';
    }
    return $data;
}

function get_json(){
    global $file_name, $date;
    $json = 'error';
    if(strtotime('+1 day', $date) < strtotime('now')) {
        $json = 'Stale cache.';
    } else {
        $json = file_get_contents($file_name);
    }
    return $json;
}

if(isset($_GET['aggr'])) {
    echo json_encode(write_json($_GET['feed'], $_GET['aggr']));
} elseif(isset($_GET['json'])) {
    echo get_json();
}
else {
   echo $error = 'no post data to process';
}
