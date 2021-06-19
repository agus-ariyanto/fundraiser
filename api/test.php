<?php
error_reporting(E_ALL);
ini_set('display_errors','On');
// $now=microtime()*1000;
// $old=$now;
echo 'TEST INSERT 150 '.'<br>';
function slog($title){
   sleep(1);
   $time = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
   echo "$title : {$time}".'<br>';
}

slog('start');

define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR',dirname(__FILE__));
require_once (ROOT_DIR.DS.'core'.DS.'auto.php');
include ROOT_DIR.DS.'core'.DS.'config.php';


$cp=new FrCampaign;
slog('main');
for($i=0;$i<=150;$i++) {
    $cp->colVal('title',sha1(uniqid()));
    $cp->save();
    if($i%10==0) slog($i);
}
