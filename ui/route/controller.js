define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        var ocr=document.getElementById('offcanvas-right');
        var rightCanvas = new bootstrap.Offcanvas(ocr);

        $scope.helper=Helper;
        $scope.table=[];
        $scope.tab=0;
        $scope.child_tab=0;

        // komponen
        $scope.comment={};
        $scope.donatur={};
        $scope.donatur_form={
            back:function(){
                $scope.tab=0;
            }
        };

        $scope.picture={
            image:'',
            back:function(){
                $scope.child_tab=0;
            }
        }

        $scope.init=function(){
            Api.Get('token')
                .then(function(res){
                    $auth.login(res.data.token);
                    return Api.Get('today',{format:'Ymd'});
                })
                .then(function(res){
                    $auth.setUserData({ts:res.data});
                    return Api.Get('campaign',{cascade:1});
                })
                .then(function(res){
                    $scope.table=res.data;
                });
        }

        $scope.firstImage=function(data){
            if(data.photo[0]) return 'api/'+data.photo[0].image;
            return 'assets/img/picture.png';
        }
        $scope.showImage=function(val){
            $scope.picture.image=val;
            $scope.child_tab=2;
        }
        $scope.openComments=function(val){
            Api.Get('comment',{cascade:1,campaign_id:{equal:val.id}})
            .then(function(res){
                $scope.comment.table=res.data;
            });

        }

        $scope.init();

/*end controller*/
        }];
});
