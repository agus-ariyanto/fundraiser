<?php
/*  konfigurasi untuk koneksi dbase
 * offset untuk limit record yang ditampilkan
 */

  $db=array(
      'host'=>'127.0.0.1',
      'user'=>'root',
      'pwd' =>'admin',
      'name'=>'fundraiser',
      'offset' =>'500'
  );

// $db=array(
// 'host'=>'localhost',
// 'user'=>'sologlob_us3rspd',
// 'pwd' =>'sologlob_us3rspd',
// 'name'=>'sologlob_dbspd',
// 'offset' =>'500'
// );

$prefix='Fr';

$noauth=array('image','login','token');
$jwt=array(
    'alg'=>'HS256',
    'key'=>'fundraiser',
);

/* dev_mode -> develop mode
 * beri nilai selain satu untuk production
 */
define('DEV_MODE',0);
