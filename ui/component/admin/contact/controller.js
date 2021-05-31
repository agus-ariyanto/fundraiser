define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.helper=Helper;
        $scope.data={};
        $scope.table=[];
        $scope.step=0;
        $scope.init=function(){
            Api.Get('contact',{})
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
                name:val.name,
                phone:val.phone,
                email:val.email
            }
            $scope.step=1;
        }
        $scope.$watch('data.phone',function(v){
            $scope.data.phone=Helper.toPhone(v);
        })
        $scope.submit=function(){
            Api.Post('save/contact',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.step=0;
            });
        }

        $scope.init();

        /* end controller */
    }];
});
