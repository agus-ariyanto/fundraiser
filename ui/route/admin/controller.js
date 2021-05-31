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
        $scope.comment={};
        $scope.donatur={};
        $scope.rekening={};
        $scope.contact={};
        $scope.menu.toTab(0);

/*end controller*/
        }];
});
