<?php
class Auth extends Ctrl{
    function __construct(){
        parent::__construct();
        $this->model='auth';
        $this->model_id=$this->query[0];
    }
    protected check(){
        global $authlogin;
        if(!empty($this->Params->key('password')))
            $this->Params->set('pwd',sha1($this->Params->key('password')));
        if(!empty($this->Params->key('pwd')))
            $this->Params->set('pwd',sha1($this->Params->key('pwd')));
        if($authlogin['grup_id']!=1){
            $this->status(404);
            $this->data(0);
            return false;
        }
        return true;
    }

    function select(){
        if(!$this->check())return;
        $res=$this->db->select($this->model,$this->Params);
        if(count($res['data'])>0){
            $data=array();
            foreach ($res['data'] as $key => $value) {
                unset($value['pwd']);
                unset($value['token']);
                $data[]=$value;
            }
            $res['data']=$data;
        }
        $this->data($res);
    }

    function id(){
        if(!$this->check()) return;
        $res=$this->db->id($this->model,$this->model_id);
        if(empty($res)) {
            $this->notfound();
            return;
        }
        unset($res['pwd']);
        unset($res['token']);
        $this->data($res);
    }
    function save(){
        if(!$this->check()) return;
        parent::save();
    }
    function insert(){
        if(!$this->check()) return;
        parent::insert();
    }
    function update(){
        if(!$this->check()) return;
        parent::update();
    }
    function delete(){
        if(!$this->check()) return;
        parent::update();
    }

}
