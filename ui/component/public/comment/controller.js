define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.helper=Helper;
        $scope.tab=0;
        $scope.data={}
        $scope.comments=[];
        $scope.campaign={};
        $scope.submit=function(){
            Api.Post('comment',$scope.data)
            .then(function(res){
                var d=$auth.userdata;
                d.name=$scope.data.name;
                d.phone=$scope.data.phone;
                $auth.setUserData(d);
                $scope.init();
                $scope.tab=0;
            });
        }
        $scope.init=function(){
            Api.Get('comment',{
                campaign_id:{
                    equal:$scope.campaign.id
                },
                comment_id:{
                    equal:0
                },
                and:1,
                order:'id ASC',
                cascade:1
            })
            .then(function(res){
                $scope.table=res.data;
                if($auth.userdata.name) $scope.data.name=$auth.userdata.name;
                if($auth.userdata.phone) $scope.data.phone=$auth.userdata.phone;
                if(!$scope.table.length)$scope.add();
            });
        }

        $scope.add=function(){
            $scope.data.campaign_id=$scope.campaign.id;
            $scope.data.comment_id='';
            $scope.data.content='';
            $scope.tab=1;
        }

        $scope.reply=function(val){
            $scope.data.campaign_id=$scope.campaign.id;
            $scope.data.comment_id=val.id;
            $scope.data.content='';
            $scope.tab=1;
        }
        $scope.$watch('data.phone',function(e){
            $scope.data.phone=Helper.toPhone(e);
        });

/*end controller*/
    }];
});
