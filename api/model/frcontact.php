<?php
class FrContact extends Model{
    protected $alias='contact';
    protected $columns=array(
        'number'=>'VARCHAR(128)',
        'email'=>'VARCHAR(256)',
    );
}
