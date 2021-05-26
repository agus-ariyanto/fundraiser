<?php
/*
=====================
harus pake resclient
=====================
*/
ini_set('display_errors','On');
define('DS', DIRECTORY_SEPARATOR);
define('ROOT_DIR',dirname(dirname(__FILE__)));

require_once (ROOT_DIR.DS.'core'.DS.'auto.php');
include ROOT_DIR.DS.'core'.DS.'config.php';

 if(!empty($_POST['email']) && !empty($_POST['password'])){
     $m=ucfirst(strtolower($prefix)).'Auth';
     $auth=new $m;
      $auth->andWHere('email',$_POST['email']);
      $res=$auth->select();
      if($auth->num_rows>0){
          $auth->colVal('pwd',sha1($_POST['password']));
          $auth->save($res[0]['id']);
          header('Content-Type: application/json');
          echo json_encode($auth->select($res[0]['id']));
      }
}
