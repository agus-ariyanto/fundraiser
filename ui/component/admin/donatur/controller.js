
define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.data={};
        $scope.table=[];
        $scope.tab=0;
        $scope.image='';
        $scope.confirm=function(val){
            $scope.image=val.image;
            $scope.data={
                id:val.id,
                confirmed:1
            };
            $scope.tab=1;
        }
        $scope.submit=function(){

            Api.Post('save/donatur',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.tab=0;
            });
        }
        $scope.init=function(){
            Api.Get('donatur',{order:'id DESC'})
            .then(function(res){
                $scope.table=res.data;
            });
        }


        $scope.init();

        /* end controller */
    }];
});
