'use strict'

var builder = require('botbuilder');
var consts = require('../helpers/consts');

module.exports = [

        function(session, args, next){        
            if(args && !args.reprompt){
                next();
            }else{   
            builder.Prompts.text(session, consts.Prompts.TABLE_RESERVE);
        }
            
    },
    function(session, results, next){   
        console.log(results.response);        
        if(results.response != (undefined || null)){
            session.userData.name = results.response;
            session.replaceDialog('/tablereserveemail');
        }else{
            next();
        }
    },
        function(session, results){   
            
            builder.Prompts.choice(session, consts.Prompts.GROUP_COUNT, "4-6|7-10|11-15|16+", 
            {listStyle: builder.ListStyle.button});                
        
        
    },
    function(session, results){   
        session.userData.ppl = results.response.entity;
        if (results.response.entity != "16+"){
        
        session.replaceDialog("/seven-fifteen");

        }else if (results.response.entity == "16+"){
                 
        session.replaceDialog("/sixteen");

        }

    }

]