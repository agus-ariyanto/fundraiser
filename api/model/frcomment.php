<?php
class FrComment extends Model{
    protected $alias='comment';
    protected $columns=array(
        'campaign_id'=>'INT',
        'content'=>'VARCHAR(512)',
        'name'=>'VARCHAR(128)',
        'phone'=>'VARCHAR(32)',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
    public $join='campaign';
    public $child='reply';
}
