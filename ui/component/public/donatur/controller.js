define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.campaign={};
        $scope.table=[];
        $scope.init=function(){
            Api.Get('donatur',{
                campaign_id:{equal:$scope.campaign.id},
                order:'id ASC'
            })
            .then(function(res){
                $scope.table=res.data;
            });
        };

        // overwrite parent
        $scope.openFormDonasi=function(){
            return;
        }



/*end controller*/
    }];
});
