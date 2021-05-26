define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){

        $scope.menu={
            tab:2,
            title:{},
            top:[],
            data:[
                    {icon:'flag',title:'Campaign',tab:0,top:[]},
                    {icon:'calculator',title:'Donatur',tab:1,top:[]},
                    {icon:'comment',title:'Comment',tab:2,top:[]},
                    {icon:'book',title:'Archieve',tab:3,top:[]},
                ]
        }

        $scope.menu.toTab=function(tab){
            $scope.menu.tab=tab;
            for(var i=0;i<$scope.menu.data.length;i++) $scope.menu.data[i].active=false;
            $scope.menu.data[tab].active=true;
            $scope.menu.title=$scope.menu.data[tab];
        }

        // komponen
        $scope.campaign={};
        $scope.comment={};
        $scope.donatur={};



/*end controller*/
        }];
});
