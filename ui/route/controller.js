define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.helper=Helper;
        $scope.table=[];
        $scope.search_text='';
        $scope.open_picture=0;
        $scope.image_source='';
        $scope.tab=0;

        // komponen
        $scope.comment={};
        $scope.donatur={};
        $scope.donatur_form={
            back:function(){
                $scope.tab=0;
            }
        };



        $scope.init=function(){
            if(!$auth.userdata) $auth.setUserData({exp:'0'});
            if(!$auth.islogin()){
                return Api.Get('token')
                .then(function(res){
                    $auth.login(res.data);
                    return Api.Get('today',{format:'Ymd'});
                })
                .then(function(res){
                    return $auth.setUserData({exp:res.data});
                });
            }
            return Api.Get('today',{format:'Ymd'})
            .then(function(res){
                if($auth.userdata!=res.data) {
                    $auth.setUserData(res.data);
                    return Api.Get('token');
                }
            });
        }
        $scope.getCampaign=function(){
            Api.Get('campaign',data)
            .then(function(res){
                $scope.table=res.data;
            });
        }

        $scope.logout=function(){
            $auth.logout();
            window.location.href=alt.baseUrl+alt.loginRoute;
        }
        $scope.firstImage=function(data){
            if(data.photo[0]) return 'api/'+data.photo[0].image;
            return 'assets/img/picture.png';
        }
        $scope.showImage=function(val){
            $scope.image_source=val;
            $scope.open_picture=1;
        }

        $scope.init();

/*end controller*/
        }];
});
