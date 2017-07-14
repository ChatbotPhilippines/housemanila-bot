'use strict'

var builder = require('botbuilder');
var consts = require('../helpers/consts');

module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        builder.Prompts.number(session, consts.Prompts.SEVEN_FIFTEEN);                    

    },
    function(session,results){   
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        if (results.response != null){
            
            builder.Prompts.choice(session, `${session.dialogData.numbers.phone} ` + consts.Prompts.CONFIRMATION, "Yes|No", {listStyle: builder.ListStyle.button});

        }
        
    },
    function(session,results){   
        console.log(results.response.entity);
        if(results.response.entity == "Yes"){

            session.endDialog(consts.Messages.CONFIRMATION_CODE, session.dialogData.numbers.phone);

        }else if (results.response.entity == "No"){
            session.replaceDialog("/contactnumber");
        }

    }

]