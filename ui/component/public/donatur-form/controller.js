define(['ui/system/api','ui/system/helper'], function(){
    return ['$scope', '$auth','Api', 'Helper',
    function($scope, $auth, Api, Helper ){
        $scope.data={
            image:'upload/210531-092034402.png'
        }
        $scope.photoOnChange=function(el){
            var f=el.files[0];
            Api.Upload('image/upload',{image:f})
            .then(function(res){
                $scope.data.image=res.data.image;
            });
        }

        $scope.tab=0;
        $scope.photoUpload=function(){
            $('#photo-upload').click();
        }



/*end controller*/
    }];
});
