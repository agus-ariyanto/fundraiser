<?php
class Image extends Base{
    protected $updir='upload';

    // inisial absolute direktori upload dan nama file
    // diambil dari tanggal-[jam][menit][detik][milidetik]
    function __construct(){
        parent::__construct();
        $this->dir=ROOT_DIR.DS.$this->updir;
        $date=new DateTime();
        //$this->filename=$date->format('ymd-His');
        $this->filename=$date->format('ymd-Hisv');
    }
     function index(){
         // handle upload file
         if(isset($_FILES['image'])){
             $this->upload();
             return;
         }
        // handle post image text (base 64)
         if(isset($_POST['image'])){
             $this->post();
             return;
         }
     }

     // handle post image-text
     function post(){
         $ext=empty($this->query[0])?'jpg':strtolower($this->query[0]);
         if(isset($_POST['image'])){
             $img=str_replace('data:image/'.$ext.';base64,','',$_POST['image']);
             $data=base64_decode($img);
             file_put_contents($this->dir.DS.$this->filename.'.'.$ext,$data);
             $this->data( array(
                 'success'=>true,
                 'image'=>$this->updir.'/'.$this->filename.'.'.$ext,
             ));
             return;
         }
         $this->data(array(
             'success'=>false,
             'error'=>'error uploaded empty image',
         ));
     }

     // handle upload image file
     function upload(){
          if(isset($_FILES['image'])){
              $img=$_FILES['image'];
              $ext=strtolower(pathinfo($img['name'],PATHINFO_EXTENSION));
              if(in_array($ext,array('png','jpeg','jpg'))){
                  if(move_uploaded_file($img['tmp_name'],$this->dir.DS.$this->filename.'.'.$ext)){
                      $this->data(array(
                          'success'=>true,
                          'image'=>$this->updir.'/'.$this->filename.'.'.$ext,
                      ));
                      return;
                  }
              }
          }
          $this->data(array(
                  'success'=>false,
                  'error'=>'error uploaded empty image',
          ));
      }

      // decode uploaded image file
      // menjadi imguri
      function textdata(){
          if(empty($this->query[0])){
               $this->data(array(
                   'success'=>false,
                   'error'=>'no file image to convert',
               ));
               return;
           }
          $file=$this->dir.DS.str_replace('_','-',$this->query[0]);
          if(!file_exists($file)){
              $this->data(array(
                  'success'=>false,
                  'error'=>'file not found',
              ));
              return;
          }
          $imageData = base64_encode(file_get_contents($file));
          $data='data:'.mime_content_type($file).';base64,'.$imageData;
          $this->data(array(
               'success'=>true,
               'image'=>$data,
          ));
     }


}
