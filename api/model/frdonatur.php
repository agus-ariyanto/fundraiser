<?php
class FrDonatur extends Model{
    protected $alias='donatur';
    protected $columns=array(
        'campaign_id'=>'INT',
        'name'=>'VARCHAR(128)',
        'ha'=>'INT DEFAULT 0',
        'phone'=>'VARCHAR(128)',
        'confirmed'=>'INT DEFAULT 0',
        'image'=>'VARCHAR(128)',
        'amount'=>'INT DEFAULT 0',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
    public $join='campaign';
}
