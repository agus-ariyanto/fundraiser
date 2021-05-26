<?php 
class FrUserlog extends Model{
    protected $alias='userlog';
    protected $columns=array(
        'remote_addr'=>'VARCHAR(128)',
        'http_user_agent'=>'VARCHAR(256)',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
}