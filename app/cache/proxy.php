<?php

$file = $_SERVER['DOCUMENT_ROOT'] . 'aggr.json';
$date = filemtime($file);

function write_json($data){
    global $file, $date;
    if($date > strtotime('yesterday + 1 second')) {
        $file = file_put_contents($file, $data);
        if($file === false) {
            die('There was an error writing this file');
        }
        else {
            echo "success";
        }
    }
}

function get_json(){
    global $file, $date;
    print $date . ' < ' . strtotime('yesterday + 1 second');
    if($date < strtotime('yesterday + 1 second')) {
        echo file_get_contents($file);
    }
}

if(isset($_GET['aggr'])) {
    $data = $_GET['aggr'];
    write_json($data);
} elseif(isset($_GET['json'])) {
    get_json();
}
else {
   die('no post data to process');
}

