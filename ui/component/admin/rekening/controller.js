define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.data={};
        $scope.table=[];
        $scope.step=0;
        $scope.init=function(){
            Api.Get('rek')
            .then(function(res){
                $scope.table=res.data;
            });
        }
        $scope.add=function(){
            $scope.data={};
            $scope.step=1;
        }
        $scope.edit=function(val){
            $scope.data={
                id:val.id,
                rekno:val.rekno,
                an:val.an,
                bank:val.bank
            }
            $scope.step=1;
        }

        $scope.submit=function(){
            Api.Post('save/rek',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.step=0;
            });
        }
        $scope.init();
        /* end controller */
    }];
});
