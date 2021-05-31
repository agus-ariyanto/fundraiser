<?php
class Picture extends Ctrl{
    function __construct(){
        parent::__construct();
        $this->model='picture';
        $this->id=$this->query[0];
    }

    function remove(){
        $this->data(0);
        if(empty($this->Params->key('in'))) return ;
        if(empty($this->Params->key('model'))) return ;
        $ids=explode(',',$this->Params->key('in'));
        if(count($ids)<1) return ;
        $parent= $this->Params->key('model');

        $model=$this->model;
        $this->addModel($model);
        $params=new Params;
        $params->clear();
        $res=array();
        foreach($ids as $value){
            $params->set('id',$value);
            $params->set($parent.'_id','-'.$value);
            $res[]=$this->$model->savePost($params->all());
        }
        $this->data($res);
    }
}
