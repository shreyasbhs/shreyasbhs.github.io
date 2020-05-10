(function ()
{   'use strict';
 
    angular.module('app',[]).controller('buy',buy)
    .controller('bought',bought)
    .service('handler',handler);
    buy.$inject = ['handler'];
    bought.$inject = ['handler'];
    function buy(handler)
    {
       
       
       this.buylist = handler.getbuylist();
       this.buyit = function(index)
       {
              handler.buyit(index); 
       }
   
    }
    function bought(handler)
    {
        var bought = this;
        bought.boughtItems = handler.getBoughtItems();
    }
    function handler()
    {
        var handler = this;
        handler.buylist = [
            {name:'Cooking Oil',quantity:'5 lts'},
            {name:'Soup',quantity:'5 pieces'},
            {name:'Washing powder',quantity:'2 packs'},
            {name:'Noodles',quantity:'3 packs'},
            {name:'Chocolates',quantity:'15 packs'},
            {name:'Wheat flour',quantity:'5 kg'},
            {name:'Rice',quantity:'5 kg'},
            {name:'Chilli Powder',quantity:'5 kg'}
                    ];
        handler.boughtItems = [];
        handler.getbuylist = function()
        {   
         
            return handler.buylist;
        }
        handler.getBoughtItems = function()
        {
            return handler.boughtItems;
        }
        handler.buyit = function(index)
        {
           handler.boughtItems.push(handler.buylist[index]); 
           handler.buylist.splice(index,1);
        }
    }
})();