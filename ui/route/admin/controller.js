define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.menu={
            tab:0,
            title:{},
            top:[],
            data:[
                    {icon:'flag',title:'Campaign',tab:0,active:true},
                    {icon:'calculator',title:'Donatur',tab:1},
                    {icon:'comment',title:'Comment',tab:2},
                    {icon:'phone',title:'Contact',tab:3},
                    {icon:'qrcode',title:'Rekening',tab:4},
                    {icon:'book',title:'Archieve',tab:5}
                ]
        }

        $scope.menu.toTab=function(tab){
            /*
            <div alt-component="admin/campaign" data-scope="campaign" ng-show="menu.tab==0"></div>
            <div alt-component="admin/donatur" data-scope="donatur" ng-show="menu.tab==1"></div>
            <div alt-component="admin/comment" data-scope="comment" ng-show="menu.tab==2"></div>
            <div alt-component="admin/contact" data-scope="contact" ng-show="menu.tab==3"></div>
            <div alt-component="admin/rekening" data-scope="rekening" ng-show="menu.tab==4"></div>
            */
            $scope.menu.tab=tab;
            for(var i=0;i<$scope.menu.data.length;i++) $scope.menu.data[i].active=false;
            $scope.menu.data[tab].active=true;
            $scope.menu.title=$scope.menu.data[tab];
        }

        // komponen
        // overwrite dari /component/campaign
        $scope.campaign={
            contact:[],
            rek:[],
            table:[],
            init:function(){
                Api.Get('rek',{order:'id ASC'})
                .then(function(res){
                    $scope.campaign.rek=res.data;
                    return Api.Get('contact',{order:'id ASC'});
                })
                .then(function(res){
                    $scope.campaign.contact=res.data;
                    return Api.Get('campaign',{cascade:1});
                })
                .then(function(res){
                    $scope.campaign.table=[];
                    $scope.campaign.table=res.data;
                });
            }
        };

        // security login
        $scope.init=function(){
            if(!$auth.userdata.grup_id||$auth.userdata.grup_id>2){
                window.location.href=alt.baseUrl+alt.loginRoute;
            }
        }
        $scope.comment={};
        $scope.donatur={};
        $scope.rekening={};
        $scope.contact={};
        $scope.menu.toTab(0);
        $scope.init();

/*end controller*/
        }];
});
