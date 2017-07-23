'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
module.exports = [
    function(session, args, next){
        console.log(args);
        if (args != "add"){
        builder.Prompts.choice(session, consts.Prompts.CELEBRATE, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});        
    }else{
        next();
    }
    
    
    },
    // function(session,results){   
    //     console.log(results.response.entity);
    //     if (results.response != null){
    //         session.replaceDialog('/birthday');             
    //     }
    // }
    
    function(session, results, next){  
        console.log(results.response.entity + "this is reults");     
        builder.Prompts.choice(session, consts.Prompts.BIRTHDAY_REQUEST, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
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