define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.helper=Helper;
        $scope.data={};
        $scope.profile={
            submit:function(){
                Api.Post('auth/profile',$scope.profile.data)
                .then(function(res){
                    $auth.setUserData($scope.profile.data);
                    window.location.href=alt.baseUrl+alt.defaultRoute;
                });
            }
        };
        $scope.open_profile=false;
        $scope.openProfile=function(){
            Api.Get('divisi',{order:'id ASC'})
            .then(function(res){
                $scope.profile.divisi=res.data;
                return Api.Get('office',{order:'id ASC'});
            })
            .then(function(res){
                $scope.profile.create_user=false;
                $scope.profile.office=res.data;
                $scope.profile.title='Profil Akun';
                $scope.profile.message='konfirmasi ini hanya muncul saat pertama kali anda menggunakan aplikasi ini';
                $scope.profile.mandatory=true;
                $scope.profile.data=$auth.userdata;
                $scope.open_profile=true;
            });
        }

        $scope.submit=function(){
            Api.Post('login',$scope.data)
            .then(function(res){
                if(res.data.success){
                    $auth.login(res.data.token);
                    $auth.setUserData(res.data.userdata);

                    if(res.data.userdata.divisi_id==0) return $scope.openProfile();
                    window.location.href=alt.baseUrl+alt.defaultRoute;
                }
            });
        }


/*end controller*/
        }];
});
