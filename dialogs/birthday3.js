'use strict'

var builder = require('botbuilder');
var consts = require("../helpers/consts")

module.exports = [

        function(session){        
        builder.Prompts.choice(session, consts.Prompts.WHAT_ELSE, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == 'Others'){            
            builder.Prompts.text(session, consts.Prompts.ENTER_MESSAGE);
        }
        else if (results.response != null){
            session.replaceDialog('/birthday2'); 
        }
    },
    function(session,results){  
        
        builder.Prompts.choice(session, consts.Messages.OTHERS_REQUEST, "Continue", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){  
        
        if(results.response.entity == 'Continue'){
            session.replaceDialog("/tablereserve");
        }
        

    }

]