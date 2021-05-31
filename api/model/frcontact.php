<?php
class FrContact extends Model{
    protected $alias='contact';
    protected $columns=array(
        'name'=>'VARCHAR(128)',
        'phone'=>'VARCHAR(128)',
        'email'=>'VARCHAR(256)',
    );
}
