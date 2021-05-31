define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope){
        $scope.image='';

        //dioverwrite parent
        $scope.back=function(){
            return;
        }

        /* end controller */
    }];
});
