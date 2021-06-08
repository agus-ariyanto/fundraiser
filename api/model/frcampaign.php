<?php
// mark
// 0:draft
// 1:rilis
// 2:close ( arsip )

class FrCampaign extends Model{
    protected $alias='campaign';
    protected $columns=array(
        'rek_id'=>'INT',
        'contact_id'=>'INT',
        'theme_id'=>'INT DEFAULT 0',
        'title'=>'VARCHAR(128)',
        'content'=>'TEXT',
        'amount'=>'INT DEFAULT 0',
        'donatur'=>'INT DEFAULT 0',
        'goal'=>'INT','theme_id'=>'INT DEFAULT 1',
        'confirmed'=>'INT DEFAULT 0',
        'ts'=>'TIMESTAMP DEFAULT CURRENT_TIMESTAMP',
        'start'=>'DATETIME',
        'stop'=>'DATETIME',
        'mark'=>'INT DEFAULT 0',
    );
    public $join='rek,contact,theme';
    public $child='picture';
}
