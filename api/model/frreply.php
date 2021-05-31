<?php
class FrReply extends Model{
    protected $alias='reply';
    protected $columns=array(
        'campaign_id'=>'INT',
        'comment_id'=>'INT DEFAULT 0',
        'content'=>'VARCHAR(512)',
        'name'=>'VARCHAR(128)',
        'phone'=>'VARCHAR(32)',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
    public $join='comment';
}
