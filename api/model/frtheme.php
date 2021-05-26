<?php
class FrTheme extends Model{
    protected $alias='theme';
    protected $columns=array(
        'title'=>'VARCHAR(128)',
        'txt'=>'VARCHAR(128)',
        'bgtxt'=>'VARCHAR(128)',
        'border'=>'VARCHAR(128)',
    );
    protected $firstdata=array(

        array(
            'title'=>'Primary',
            'bgtxt'=>'bg-primary text-white',
            'txt'=>'text-primary',
            'border'=>'border-primary',
        ),
        array(
            'title'=>'Secondary',
            'bgtxt'=>'bg-secondary text-white',
            'txt'=>'text-secondary',
            'border'=>'border-secondary',
        ),
        array(
            'title'=>'Success',
            'bgtxt'=>'bg-success text-white',
            'txt'=>'text-success',
            'border'=>'border-success',
        ),
        array(
            'title'=>'Danger',
            'bgtxt'=>'bg-danger text-white',
            'txt'=>'text-danger',
            'border'=>'border-danger',
        ),
        array(
            'title'=>'Warning',
            'bgtxt'=>'bg-warning text-dark',
            'txt'=>'text-warning',
            'border'=>'border-warning',
        ),
        array(
            'title'=>'Info',
            'bgtxt'=>'bg-info text-dark',
            'txt'=>'text-info',
            'border'=>'border-info',
        ),
        array(
            'title'=>'Light',
            'bgtxt'=>'bg-light text-dark',
            'txt'=>'text-light',
            'border'=>'border-light',
        ),
        array(
            'title'=>'Dark',
            'bgtxt'=>'bg-dark text-white',
            'txt'=>'text-dark',
            'border'=>'border-dark',
        ),
        array(
            'title'=>'White',
            'bgtxt'=>'bg-white text-dark',
            'txt'=>'text-white',
            'border'=>'border-light',
        ),
    );
}
