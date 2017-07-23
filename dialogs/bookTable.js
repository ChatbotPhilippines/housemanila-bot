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
        
        builder.Prompts.text(session, consts.Prompts.TABLE_RESERVE);
        

    },
    function(session, results){   
        console.log(results.response.entity);
        if (results.response != null){
            builder.Prompts.choice(session, consts.Prompts.GROUP_COUNT, "4-6|7-10|11-15|16+", 
        {listStyle: builder.ListStyle.button});

        }
    },
    function(session, results, args, next){   
    session.dialogData.head = results.response.entity; 
    if(session.dialogData.head != "16+"){
        session.dialogData.numbers = args || {};
        if (args && args.reprompt) {
              builder.Prompts.text(session, consts.Prompts.CONTACT_NUMBER_FORMAT);
        }else{   
        builder.Prompts.text(session, consts.Prompts.SEVEN_FIFTEEN);                    
        }
    }else{
        next();
        }
    },
    function(session,results, next){   
        if(session.dialogData.head != "16+"){
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        var phonestring = session.dialogData.numbers.phone;
        var phonenumber = phonestring.toString();
        var matched = phonenumber.match(/\d+/g);
        var number = matched ? matched.join('') : '';
        if (number.length == 10 || number.length == 11 || number.length == 9) {                    

            
            builder.Prompts.choice(session, `${phonestring} ${consts.Prompts.CONFIRMATION}`, "Yes|No", {listStyle: builder.ListStyle.button}, {reprompt: false});

        }else{
             session.replaceDialog('/contactnumber', { reprompt: true });
        }
    }else{
        next();
    }
        
    },
    function(session,results, next){   
        if(session.dialogData.head != "16+"){
        console.log(results.response.entity);
        if(results.response.entity == "Yes"){

            session.endDialog(consts.Messages.CONFIRMATION_CODE, session.dialogData.numbers.phone);

        }else if (results.response.entity == "No"){
            session.replaceDialog("/contactnumber");
        }

    
    }else{
        next();
    }

},

function(session, args, next){
        session.send(consts.Messages.VIP_OFFER);
        var img = new builder.Message(session)
                        .addAttachment({
                            contentURL: 'http://i.imgur.com/fJsZQY6.png',
                            contentType: 'image/jpg',                            
                        });                    
                    session.send(img);
        builder.Prompts.choice(session, `Select: `, "Sure! Get me one|No thanks", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == "Sure! Get me one"){

            session.endDialog(consts.Messages.VIP_CONFIRMATION);

        }else if (results.response.entity == "No thanks"){
            session.replaceDialog("/contactnumber");
        }
        
    }


]