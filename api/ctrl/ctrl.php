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

    protected function selectChild($modelchild,$model_id){
        $this->addModel($modelchild);
        $this->$modelchild->andWhere($this->model.'_id',$model_id);
        return $this->$modelchild->select();
    }

    function select(){
        $cascade=!empty($this->Params->key('child'))||!empty($this->Params->key('cascade')) ;
        $res=$this->db->select($this->model,$this->Params);
        $this->data($res);
        if(!$cascade) return ;

        // select child
        $model=$this->model;
        $this->addModel($model);
        $haschild=$this->$model->child;
        if(empty($haschild)) return ;
        $child=explode(',',$haschild);
        $data=array();
        foreach($res['data'] as $key=>$value){
            foreach($child as $model_child)
                $value[$model_child]=$this->selectChild($model_child,$value['id']);
            $data[]=$value;
        }
        $res['data']=$data;
        $this->data($res);
    }


    function id(){
        $res=$this->db->id($this->model,$this->model_id);
        if(empty($res)) {
            $this->notfound();
            return;
        }
        $this->data($res);
    }
    function saveChild($modelchild,$model_id){
        $data=array();
        if(empty($this->Params->key($modelchild))) return $data;
        $params=new Params;
        $this->addModel($modelchild);
        $parchild=$this->Params->key($modelchild);
        $colnames=$this->$modelchild->colNames();



        foreach ($parchild as $parkey => $parvalue) {
            $params->clear();
            foreach($colnames as $colkey=>$colvalue)
                if(isset($parvalue[$colkey])) $params->set($colkey,$parvalue[$colkey]);
            $params->set($this->model.'_id',$model_id);
            $id=$this->$modelchild->savePost($params->all());
            $data[]=$this->$modelchild->select($id);
        }
        return $data;
    }
    function insert(){
        $res=$this->db->insert($this->model,$this->Params);
        $model=$this->model;
        $this->data($res);
        $this->addModel($model);

        // check child
        if(empty($this->$model->child)) return ;

        //insert child
        $child=explode(',',$this->$model->child);
        foreach($child as $model_child) $res[$model_child]=$this->saveChild($model_child,$res['id']);
        $this->data($res);
    }

    function update(){
        if(empty($this->model_id)) return $this->data(0);

        $res=$this->db->update($this->model,$this->Params,$this->model_id);
        $model=$this->model;
        $this->data($res);

        $this->addModel($model);
        // check child
        if(empty($this->$model->child)) return ;

        //insert child
        $child=explode(',',$this->$model->child);
        foreach($child as $model_child) $res[$model_child]=$this->saveChild($model_child,$res['id']);
        $this->data($res);
    }

    function save(){
        if(empty($this->Params->key('id'))) return $this->insert();
        $this->model_id=$this->Params->key('id');
        $this->update();
    }

    function delete(){
        if($this->authlogin['grup_id']>2){
            $this->status(404);
            $this->data(0);
            return ;
        }
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
