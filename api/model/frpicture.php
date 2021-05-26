<?php
class FrPicture extends Model{
    protected $alias='picture';
    protected $columns=array(
        'campaign_id'=>'INT',
        'image'=>'VARCHAR(128)',
    );
}
