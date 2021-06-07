<?php

// aliasing comment
// api/model/frcomment.php
class FrReply extends Model{
    protected $alias='comment';
    protected $table='frcomment';
    protected $columns=array(
        'campaign_id'=>'INT',
        'comment_id'=>'INT DEFAULT 0',
        'content'=>'VARCHAR(512)',
        'name'=>'VARCHAR(128)',
        'phone'=>'VARCHAR(32)',
        'mark'=>'INT DEFAULT 0',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
    public $join='campaign';
}
