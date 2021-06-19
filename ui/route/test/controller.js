define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.step=0;
        $scope.data={};
        $scope.tabel=[];
        $scope.init=function(){
            Api.Get('test',{})
            .then(function(res){
                $scope.table=res.data;
            });
        }

        $scope.submit=function(){
            Api.Post('save/test',$scope.data)
            .then(function(res){
                $scope.init();
                $scope.step=0;
            });
        }

        $scope.add=function(){
            $scope.data={}
            $scope.step=1;
        }
        $scope.edit=function(val){
            $scope.data=angular.copy(val);
            $scope.step=1;
        }

        $scope.init();
        /*end controller*/
                }];
        });
