<?php
class FrDonatur extends Model{
    protected $alias='donatur';
    protected $columns=array(
        'campaign_id'=>'INT',
        'name'=>'VARCHAR(128)',
        'number'=>'VARCHAR(128)',
        'email'=>'VARCHAR(256)',
        'city'=>'VARCHAR(256)',
        'confirmed'=>'INT DEFAULT 0',
        'image'=>'VARCHAR(128)',
        'amount'=>'INT'
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
    );
}
