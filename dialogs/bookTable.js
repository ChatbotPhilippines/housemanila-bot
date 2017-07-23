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
        console.log(JSON.stringify(results.response) + "this is reults");     
        if(results.response != undefined){

        builder.Prompts.choice(session, consts.Prompts.BIRTHDAY_REQUEST, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
        {listStyle: builder.ListStyle.button});

    } else {
        
        builder.Prompts.choice(session, consts.Prompts.WHAT_ELSE, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
        {listStyle: builder.ListStyle.button});
            
        }
        

    },
    function(session,results, next){  
        console.log(results.response.entity);
        if (results.response.entity == 'Others'){            
            builder.Prompts.text(session, consts.Prompts.ENTER_MESSAGE);
        }
         else{ //if (results.response != null){
        //     session.replaceDialog('/birthday2'); 
        next();
        }
    },

    function(session, results, next){
        console.log(JSON.stringify(results));
        if(results.response == null){
        builder.Prompts.choice(session, consts.Prompts.IS_THAT_ALL, "Add another|Yes, continue", 
        {listStyle: builder.ListStyle.button});
        }else{
            next();
        }
        

    },

    function(session,results, next){   
        //console.log(results.response.entity);
        if (results.response != null){         
            next();
        }        
        else if (results.response.entity == 'Add another'){
            session.replaceDialog('/bookTable', "add"); 
        }else if (results.response.entity == 'Yes, continue'){            
            session.replaceDialog('/tablereserve'); 
        }
    },

    function(session,results, next){  
        console.log(results.response.entity);
        builder.Prompts.choice(session, consts.Messages.OTHERS_REQUEST, "Continue", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){  
        
        if(results.response.entity == 'Continue'){
            session.replaceDialog("/tablereserve");
        }
        

    }


]