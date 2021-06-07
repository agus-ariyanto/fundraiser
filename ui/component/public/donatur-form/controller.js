define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.data={};
        $scope.campaign={};
        $scope.photoOnChange=function(el){
            var f=el.files[0];
            Api.Upload('image/upload',{image:f})
            .then(function(res){
                $scope.data.image=res.data.image;
            });
        }

        $scope.photoUpload=function(){
            $('#photo-upload').click();
        }

        $scope.submit=function(){
            if(!$scope.data.image) return $scope.message='bukti rekening belum diupload';
            $scope.data.amount=Helper.toNumber($scope.data.amount_number);
            if($scope.data.ha) $scope.data.ha=1;
            Api.Post('donatur',$scope.data)
            .then(function(res){
                var a=$scope.campaign.amount+$scope.data.amount;
                var b=$scope.campaign.donatur+1;
                return Api.Post('save/campaign',{id:$scope.campaign.id,amount:a})
            })
            .then(function(res){
                var d=$auth.userdata;
                d.name=$scope.data.name;
                d.phone=$scope.data.phone;
                $auth.setUserData(d);
                $scope.back();
            });
        }

        $scope.init=function(){
            $scope.message='';
            $scope.data.campaign_id=$scope.campaign.id;
            $scope.data.image='';
            if($auth.userdata.name) $scope.data.name=$auth.userdata.name;
            if($auth.userdata.name) $scope.data.phone=$auth.userdata.phone;
        }

        $scope.back=function(){
            return; // overwrite parent
        }
        $scope.$watch('data.amount_number',function(v){
            $scope.data.amount_number=Helper.toCurrency(v);
        });
        $scope.$watch('data.phone',function(v){

            $scope.data.phone=Helper.toPhone(v);
        });



/*end controller*/
    }];
});
