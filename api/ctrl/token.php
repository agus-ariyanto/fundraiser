<?php
class Token extends Login{
    // hanya untuk secure sembunyi login ctrler
    function __construct(){
        parent::__construct();
    }

    protected function insertLog(){
        $this->addModel('userlog');
        $this->userlog->colVal('remote_addr',$_SERVER['REMOTE_ADDR']);
        $this->userlog->colVal('http_user_agent',$_SERVER['HTTP_USER_AGENT']);
        $this->userlog->save();
    }
    function index(){
        $this->params->set('email','user');
        $this->params->set('password','user');
        $this->insertLog();
        parent::index();
    }
}
