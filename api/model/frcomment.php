<?php
class FrComment extends Model{
    protected $alias='comment';
    protected $columns=array(
        'campaign_id'=>'INT',
        'comment_id'=>'INT DEFAULT 0',
        'content'=>'TEXT',
        'name'=>'VARCHAR(128)',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
    public $join='rek,contact';
    public $child='picture';
}
