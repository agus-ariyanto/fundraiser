<?php
class Ctrl extends Base{

    //protected $user=array();
    function __construct(){
        global $authlogin;
        parent::__construct();
        $this->db=new DbJoin;
        $this->model=$this->query[0];
        $this->model_id=$this->query[1];
        $this->Params=new Params;
        $this->authlogin=$authlogin;
        $this->Params->set('usrauth_id',$authlogin['id']);
        $this->Params->set('auth_id',$authlogin['id']);
    }


    function index(){
        // get
        if($this->Params->isGet){
            if(empty($this->model_id)){
                $this->select();
                return;
            }
            $this->id();
            return;
        }

        // insert
        if($this->Params->isPost){
            //$this->Params->del('id');
            $this->insert();
            return;
        }

        // edit put
        if($this->Params->isPut){
            if(!empty($this->model_id)) {
                $this->update();
                return ;
            }
        }

        // delete
        if($this->Params->isDelete){
            if(!empty($this->model_id)) {
                $this->delete();
                return;
            }
        }

        $this->notfound();
    }

    function select(){
        $this->data($this->db->select($this->model,$this->Params));
    }


    function id(){
        $res=$this->db->id($this->model,$this->model_id);
        if(empty($res)) {
            $this->notfound();
            return;
        }
        $this->data($res);
    }

    function insert(){
        $this->data( $this->db->insert($this->model,$this->Params));
    }

    function update(){
        if(!empty($this->model_id))
            $this->data( $this->db->update($this->model,$this->Params,$this->model_id) );
    }

    function save(){
        if(empty($this->Params->key('id'))) return $this->insert();
        $model=$this->model;
        $this->addModel($model);
        $this->data($this->$model->savePost($this->Params->all()));
    }

    function delete(){
        $model=$this->model;
        $this->addModel($model);
        $count=$this->$model->delete($this->model_id);
        $this->data( array('delete'=>$count) );
    }

    function today(){
        $f=empty($this->Params->key('format')) ? 'Y-m-d H:i:s' : $this->Params->key('format');
        $this->data($f);
        $d=new DateTime;
        $this->data($d->format($f));

    }
    function authlogin(){
        $this->data($this->authlogin);
    }

}
