define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.data={};
        $scope.table=[];
        $scope.step=0;
        $scope.theme=[];
        $scope.rek=[];
        $scope.contact=[];
        $scope.deleted_picture=[];
        $scope.modal={}
        $scope.open_modal=0;
        Api.Get('theme',{order:'id ASC'})
        .then(function(res){
            $scope.theme=res.data;
        });

        // jadi defaultnya admin, di overwrite ke parent ( route/admin )
        $scope.init=function(){
            Api.Get('rek',{order:'id ASC'})
            .then(function(res){
                $scope.rek=res.data;
                return Api.Get('contact',{order:'id ASC'});
            })
            .then(function(res){
                $scope.contact=res.data;
                var d={
                    mark:{lte:1},
                    cascade:1
                }
                return Api.Get('campaign',d);
            })
            .then(function(res){
                $scope.table=[];
                if(res.data) $scope.table=res.data;
            });
        }
        $scope.uploadPicture=function(){
            $('#photo-upload').click();
        }
        $scope.pictureOnChange=function(el){
            var f=el.files[0];
            Api.Upload('image/upload',{image:f})
            .then(function(res){
                $scope.data.picture.push({image:res.data.image});
            });
        }
        $scope.delPicture=function(val){
            var i=$scope.data.picture.map(function(e){
                return e.image;
            }).indexOf(val.image);
            if($scope.data.picture[i]['id'])
                $scope.deleted_picture.push($scope.data.picture[i]);
            $scope.data.picture.splice(i,1);
        }
        $scope.submitDelPicture=function(){
            if(!$scope.deleted_picture) return true;
            return Api.Post('picture/remove',{in:p})
            .then(function(res){
                return res.data;
            });
        }
        $scope.$watch('data.goal_number', function(v){
            $scope.data.goal_number=Helper.toCurrency(v);
        });
        $scope.submit=function(){
            $scope.data.start=Date.parse($scope.data.tanggal_start).toString('yyyy-MM-dd');
            $scope.data.stop=Date.parse($scope.data.tanggal_stop).toString('yyyy-MM-dd');
            $scope.data.goal=Helper.toNumber($scope.data.goal_number);
            Api.Post('save/campaign',$scope.data)
            .then(function(res){
                var pict=$scope.deleted_picture.map(function(v){
                    return v.id;
                }).join(',');
                return Api.Post('picture/remove',{in:pict,model:'campaign'});
            })
            .then(function(res){
                $scope.init();
                $scope.step=0;
            });
        }

        $scope.add=function(){
            $scope.deleted_picture=[];
            $scope.data={
                picture:[]
            };
            $scope.step=1;
        }

        $scope.edit=function(val){
            $scope.deleted_picture=[];
            //if(!val.picture) val.picture=[];
            $scope.data=angular.copy(val);
            $scope.data.picture=val.picture||[];
            $scope.data.goal_number=val.goal;
            $scope.data.tanggal_start=Date.parse(val.start);
            $scope.data.tanggal_stop=Date.parse(val.stop);
            $scope.step=1;
        }
        $scope.rilis=function(val){
            $scope.modal=val;
            $scope.data={
                id:val.id,
                mark:1
            }
            $scope.open_modal=1;
        }
        $scope.close=function(val){
            $scope.modal=val;
            $scope.data={
                id:val.id,
                mark:2
            }
            $scope.open_modal=2;
        }
        $scope.draft=function(val){
            $scope.modal=val;
            $scope.data={
                id:val.id,
                mark:0
            }
            $scope.open_modal=3;
        }
        $scope.submitModal=function(){
            Api.Post('save/campaign',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.step=0;
            });
        }



        $scope.init();


        /* end controller */
    }];
});
