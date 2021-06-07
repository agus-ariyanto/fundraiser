<?php
// mark 0 : comment/reply user
//      1 : reply admin
//      2 : deleted comment
class FrComment extends Model{
    protected $alias='comment';
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
    public $child='reply';
}
