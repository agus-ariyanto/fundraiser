define([], function () {
    return ['$scope', '$auth',function ($scope, $auth) {
        /* begin controller */
        $scope.data=[];
        $scope.tab=0;
        $scope.title={};
        $scope.toTab=function(tab){
            $scope.tab=tab;
            for(var i=0;i<$scope.data.length;i++) $scope.data[i].active=false;
            $scope.data[tab].active=true;
        }

        $scope.logout=function(){
            $auth.logout();
            window.location.href=alt.baseUrl+alt.loginRoute;
        }
        /* end controller */
    }];
});
