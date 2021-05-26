<?php

/*
* Kelas BaseCtrl
* semua controller harap diturunkan dari kelas ini
* kelas post,get diganti dengan class params
*/
class Base{
    protected $_render=true;

    function __construct(){
        global $query;
        /* init session,post dan get */
        $this->query=$query;
        // $this->Post=new Post;
        // $this->Get=new Get;
        $this->_status=200;
    }

    /* akhir merender format json variabel $result
    */
    function __destruct(){
        if($this->_status>299) $this->_render=false;
        if($this->_render) {
            header('Content-Type: application/json');
            echo json_encode($this->_result);
        }
        http_response_code($this->_status);
    }

    function data($val){
        $this->_result=$val;
    }

    function render($value=null){
        $this->_render=$value==1;
    }

    function status($code){
        $this->_status=$code;
    }
    
    function addModel($model){
        global $prefix;
        $tbl=ucfirst(strtolower($prefix)).ucfirst(strtolower($model));
        if(!class_exists($tbl)) return false;
        if(isset($this->$model)) return true;
        $this->$model=new $tbl;
        return true;
    }
    function addClass($class){
        $class=ucfirst(strtolower($class));
        if(!class_exists($class)) return false;
        if(isset($this->$class)) return true ;
        $this->$class=new $class;
        return true;
    }


}
