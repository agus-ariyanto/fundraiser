<?php

class Login extends Base{
     function __construct(){
         parent::__construct();
         $this->params=new Params;
         $this->addModel('auth');
    }

    //create token untuk auth
    //isi data ldap_bind
    // token jwt diganti pwd
    protected function createToken($id){
        global $jwt;
        $email=$this->params->key('email');
        $pwd=$this->params->key('password');
        $data=array(
            'id'=>$id,
            'email'=>$email,
        );
        $token=JWT::encode($data,$jwt['key'],$jwt['alg']);

        $this->auth->colVal('token',$token);
        $this->auth->save($id);
        return $token;
    }

    function index(){
        $this->auth->andWhere('email',$this->params->key('email'));
        $this->auth->andWhere('pwd',sha1($this->params->key('password')));
        $res=$this->auth->select();

        $data=array(
            'userdata'=>array(),
            'token'=>0,
        );
        if(count($res)>0) {
            $userdata=$res[0];
            unset($userdata['pwd']);
            unset($userdata['token']);
            $token= empty($res[0]['token']) ?  $this->createToken($res[0]['id']) : $res[0]['token'];
            $data=array(
                'userdata'=>$userdata,
                'token'=>$token,
            );
        }

        $this->data($data);

    }

    function check(){
         $this->render(false);
         $header=getallheaders();
         if(empty($header['Authorization'])){
             $this->status(403);
             return false;
         }
         $token=str_replace('Bearer ','',$header['Authorization']);
         $this->auth->andWhere('token',trim($token));
         $this->auth->limit(1);
         $res=$this->auth->select();

         if(count($res)>0) {
             $auth=$res[0];
             unset($auth['pwd']);
             unset($auth['token']);
             return $auth;
         }
         $this->status(403);
         return false;
    }

}
