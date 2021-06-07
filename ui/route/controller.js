define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        var ocr=document.getElementById('offcanvas-right');
        var rightCanvas = new bootstrap.Offcanvas(ocr);

        $scope.helper=Helper;
        $scope.table=[];
        $scope.tab=0;
        $scope.child_tab=1;
        $scope.campaign={};

        // komponen
        $scope.comment={};
        $scope.donatur={
            openFormDonasi:function(val){
                $scope.openFormDonasi(val);
            }
        };
        $scope.donatur_form={
            back:function(){
                $scope.getCampaign();
                $scope.tab=0;
            }
        };

        $scope.picture={
            image:'',
            back:function(){
                $scope.child_tab=0;
            }
        }

        $scope.getCampaign=function(){
            Api.Get('campaign',{cascade:1})
            .then(function(res){
                $scope.table=res.data;
            });
        }
        $scope.amountPercent=function(a,g){
            a=a||0;
            g=g||1;
            c=(a/g)*100;
            return Math.round(c);

        }
        $scope.init=function(){
            Api.Get('token')
                .then(function(res){
                    $auth.login(res.data.token);
                    return Api.Get('today',{format:'Ymd'});
                })
                .then(function(res){
                    var a=$auth.userdata||{};
                    a.ts=res.data;
                    $auth.setUserData(a);
                    $scope.getCampaign();
                });
        }

        $scope.firstImage=function(data){
            if(data.photo[0]) return 'api/'+data.photo[0].image;
            return 'assets/img/picture.png';
        }
        $scope.showImage=function(val){
            // // disable dulu
            // return ;

            $scope.picture.image=val.image;
            $scope.child_tab=2;
        }
        $scope.openComments=function(val){
            $scope.comment.campaign=val;
            $scope.comment.init();
            $scope.child_tab=0;
            rightCanvas.show();
        }
        $scope.openFormDonasi=function(val){
            rightCanvas.hide();
            $scope.donatur_form.campaign=val;
            $scope.donatur_form.init();
            $scope.tab=1;
        }
        $scope.openDonatur=function(val){
            // untuk title rightcanvas pake $scope.comment.campaign;
            $scope.comment.campaign=val;
            $scope.donatur.campaign=val;
            $scope.donatur.init();
            $scope.child_tab=1;
            rightCanvas.show();
        }


         $scope.init();

/*end controller*/
        }];
});
