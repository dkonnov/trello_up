<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 0);
ini_set('display_startup_errors', 1);

header('Access-Control-Allow-Origin: *');

$action = $_SERVER['PATH_INFO'];

// get BGs
if ($action == '/getBackgrounds'){
    $count = 0;
    $dir = opendir('img/backgrounds');
    echo "[";
    while($file = readdir($dir)){
        if($file != '.' && $file != '..'){
            $count++;
            if ($count > 1) {echo ",";}
            echo "{\"id\":\"" . $count . "\", \"src\":\"" . $file . "\"}";
        }
    }
    echo "]";
}
?>