define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.helper=Helper;
        $scope.data={};

        $scope.submit=function(){
            Api.Post('login',$scope.data)
            .then(function(res){
                if(res.data.token){
                    $auth.login(res.data.token);
                    $auth.setUserData(res.data.userdata);
                    window.location.href=alt.baseUrl+'admin';
                }
            });
        }
        $scope.back=function(){
            window.location.href=alt.baseUrl;
        }


/*end controller*/
        }];
});
