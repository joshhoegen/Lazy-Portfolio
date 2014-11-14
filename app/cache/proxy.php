<?php
header('Content-Type: application/json');
$file_name = $_SERVER['DOCUMENT_ROOT'] . 'aggr.json';
$file = file_get_contents($file);
$date = filemtime($file_name);

function write_json($feed, $data){
    global $file_name, $date;
    print_r(json_decode($data));
    print "\n";
    print "\n";
    $feeds = json_decode(file_get_contents($file_name));
    if($feeds && isset($feeds->{'$feed'})){
        print "if($feeds && isset($feeds->{'$feed'}))";
        $feeds->{'$feed'} = $data;
    } else {
        $feeds = (object) array($feed => json_decode($data));
    }
    print_r($feeds);
    print "\n";
    $file_write = file_put_contents($file_name, json_encode($feeds));
    if($file_write === false) {
        return $error = 'There was an error writing this file';
    }
    else {
        $phpObj = json_decode($data);
        print_r($phpObj);
        return $data;
    }
    //print_r($feeds);
    /*if($date > strtotime('yesterday + 1 second')) {
        $file_write = file_put_contents($file_name, $feeds);
        if($file_write === false) {
            return $error = 'There was an error writing this file';
        }
        else {
            $phpObj = json_decode($data);
            print_r($phpObj);
            return $data;
        }
    }*/
}

function get_json(){
    global $file_name, $date;
    $json = 'error';
    if($date < strtotime('yesterday + 1 second')) {
        $json = file_get_contents($file_name);
    }
    print_r(json_decode(file_get_contents($file_name)));
    return $json;
}

if(isset($_GET['aggr'])) {
    echo json_encode(write_json($_GET['feed'], $_GET['aggr']));
} elseif(isset($_GET['json'])) {
    echo json_encode(get_json());
}
else {
   echo $error = 'no post data to process';
}

