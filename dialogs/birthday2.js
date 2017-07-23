'use strict'

var builder = require('botbuilder');
var consts = require("../helpers/consts")

module.exports = [

        function(session){
        builder.Prompts.choice(session, consts.Prompts.IS_THAT_ALL, "Add another|Yes, continue", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == 'Add another'){
            session.replaceDialog('/bookTable'); 
        }else if (results.response.entity == 'Yes, continue'){            
            session.replaceDialog('/tablereserve'); 
        }
    }

]