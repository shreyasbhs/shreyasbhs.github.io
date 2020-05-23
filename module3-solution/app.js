(function()
{    //registering services
    angular.module("restaurant",[]).controller("NarrowItDownController",NarrowItDownController)
    .service("MenuSearchService",MenuSearchService)
    .directive("foundItems",foundItems)
    .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");



    
    //injecting Services
    NarrowItDownController.$inject = ['MenuSearchService'];
    MenuSearchService.$inject = ['$http','ApiBasePath'];




    //MainController
    function NarrowItDownController(MenuSearchService)
    {   
        var narrow  = this;
        
        narrow.des ;//text in search field
        
        narrow.errorMsg = "";
        //get response from the server through MenuService
        var promise  = MenuSearchService.getItems();
        promise.then(
            function(response)
            {
                narrow.itemList = response.data['menu_items'];
            }
            ).catch(function(error)
            {
                alert('Somthing terribly went wrong!!!');
            });


        
        // initialize foundList to empty list
        narrow.foundList = [];
        //add items to foundList by filtering it using narrow.des
        narrow.narrowing = function()
        {   narrow.errorMsg = "Nothing found!!!"; 
            if (narrow.des==="")
               {
                   narrow.foundList = [];
                   return;
               }
            else{
                var res = narrow.itemList.filter(function(item)
            {   
               if(item.name.toLowerCase().search(narrow.des.toLowerCase())!=-1)
                  return true;
                return false;
            });
            narrow.foundList =  res;
            narrow.des = ""; 
        }
        }


    // Remove item functionality
        narrow.removeItem = function(index)
        {   
            if(narrow.foundList.length == 1)
            {
               narrow.errorMsg = "You removed everything!!!";
            }
            narrow.foundList.splice(index,1);
            
        }
    }






    // MenuSearch service to get data from server
    function MenuSearchService($http,ApiBasePath)
    {
        var menu = this;
        menu.getItems = function(){
            
           var response =  $http({
            method:"GET",
            url:ApiBasePath+"/menu_items.json"
        
        });
        return response;
    }
    }




    //Custom directive
    function foundItems()
    {
         var ddo = {
        templateUrl:'list.htm',
        
        scope:
         {
             foundList: '<',
             onRemove:'&',
             listEmpty:'&'
         },
       
            controller:NarrowItDownController,
            controllerAs:'narrow',
            bindToController:true
        

         };
        return ddo;
    }
})();