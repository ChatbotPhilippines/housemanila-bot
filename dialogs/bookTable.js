'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
module.exports = [
    function(session, args, next){
        console.log(args);
        if (!isNaN(args)){
        session.endDialog(consts.Messages.CONFIRMATION_CODE, args);
        }else if (args != "add"){
        builder.Prompts.choice(session, consts.Prompts.CELEBRATE, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});        
    }else{
        next();
    }
    
    
    },    
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
            session.dialogData.select = results.response.entity;           
            builder.Prompts.text(session, consts.Prompts.ENTER_MESSAGE);
        }
         else{ 
        next();
        }
    },

    function(session, results, next){
        if (session.dialogData.select == null){

        console.log(JSON.stringify(results) + "sa choice is that all");            
        builder.Prompts.choice(session, consts.Prompts.IS_THAT_ALL, "Add another|Yes, continue", 
        {listStyle: builder.ListStyle.button});
                
                
        }else{
            next();
        }
        

    },

    function(session,results, next){   
        
        if (session.dialogData.select == null){
        console.log(JSON.stringify(results) + `results ng
        add another`);
            if (results.response.entity == 'Add another'){
            session.replaceDialog('/bookTable', "add"); 
            }else if (results.response.entity == 'Yes, continue'){            
            session.dialogData.reserve = results.response.entity;
            next();
            }
        }else{
            next();
        }
    },

    function(session,results, next){  
        console.log(session.dialogData.reserve + "reserve at other");
        if (session.dialogData.reserve == null){
        builder.Prompts.choice(session, consts.Messages.OTHERS_REQUEST, "Continue", 
        {listStyle: builder.ListStyle.button});
    }
    else{
        next();
    }

    },
     function(session, results){  
        console.log(session.dialogData.reserve + "reserve at r");      
        
        //builder.Prompts.text(session, consts.Prompts.TABLE_RESERVE);
        session.replaceDialog("/tablereserve");
        

    }

]