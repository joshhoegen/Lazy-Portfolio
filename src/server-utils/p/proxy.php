<?php
header('Content-Type: application/json');
$file_name = '../aggr.json';
$file      = file_get_contents($file_name);
$date      = filemtime($file_name);
function write_json($data)
{
    global $file_name, $date;
    $data = json_decode($data);
    // $feeds = json_decode(file_get_contents($file_name));

    // if($feeds){
    //     $feeds->$feed = $data;
    // } else {
    //     $feeds = new stdClass();
    //     $feeds->$feed = $data;
    // }

    $file_write = file_put_contents($file_name, json_encode($data, JSON_PRETTY_PRINT));

    if ($file_write === false) {
        return $error = 'There was an error writing this file';
    } else {
        $phpObj = json_encode($data);
    }

    return $data;
}
function get_json()
{
    global $file_name, $date;
    $content = file_get_contents($file_name);
    $json = '[]';

    if ($content) {
        $json = $content;
    }

    if (strtotime('+1 day', $date) < strtotime('now')) {
        $json = '[]';
    }

    return $json;
}

$jsonPost = file_get_contents('php://input');

// phpinfo()
// var_dump(json_decode($json));
// print_r($POST)
// echo 'wewe' . $json;

if ($jsonPost) {
  // echo 'isset';
  // echo $json;
    echo json_encode(write_json($jsonPost));
} else {
  // echo 'not';
    echo get_json();
}
