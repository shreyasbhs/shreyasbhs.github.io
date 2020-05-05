(function()
{
   angular.module('myApp',[]).
   controller('myController',['$scope',function($scope)
   {
        $scope.dishString = "";
        $scope.message = "";
        
        $scope.displayMessage = function(str)
        {
            var strlist = str.split(',');
            console.log(strlist.length);
            
            
            if(str=='')
                  $scope.message = "Please enter data first";
            else if(strlist.length>3)
                  $scope.message = "Too much!";
            else
                   $scope.message = "Enjoy!";
        };
        
   }]);

}());