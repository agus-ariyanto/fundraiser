define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.table=[];
        $scope.tab=0;
        $scope.init=function(){
            Api.Get('comment',{order:'id DESC'})
            .then(function(res){
                $scope.table=res.data;
            });

        }
        $scope.reply=function(val){
            $scope.data={
                comment_id:val.id,
                name:'Admin',
                phone:'081-0000-0000',
                campaign_id:val.campaign_id,
                mark:1,
            }
            $scope.data.comment_content=val.content;
            $scope.tab=1;
        }
        $scope.remove=function(val){
            $scope.data={
                id:val.id,
                mark:2,
            }
            $scope.tab=2;
        }
        $scope.submit=function(){
            Api.Post('save/comment',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.tab=0;
            });
        }

        $scope.init();
        /* end controller */
    }];
});
