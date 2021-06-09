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
/*
$db=array(
'host'=>'sql109.ezyro.com',
'user'=>'ezyro_28829446',
'pwd' =>'6y11to2u6m7',
'name'=>'ezyro_28829446_fundraiser',
'offset' =>'500'
);
*/
$prefix='Fr';

$noauth=array('image','login','token');
$jwt=array(
    'alg'=>'HS256',
    'key'=>'fundraiser',
);

/* dev_mode -> develop mode
 * beri nilai selain satu untuk production
 */
define('DEV_MODE',1);
