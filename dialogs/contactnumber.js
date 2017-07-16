'use strict'

var builder = require('botbuilder');
var consts = require('../helpers/consts');

module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        if (args && args.reprompt) {
              builder.Prompts.text(session, consts.Prompts.CONTACT_NUMBER_FORMAT);
        }else{        
        builder.Prompts.number(session, consts.Prompts.CONTACT_NUMBER_2);                    
        }
    },
    function(session,results){   
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        var phonenumber = session.dialogData.numbers.phone;
        var matched = phonenumber.match(/\d+/g);
        var number = matched ? matched.join('') : '';
        if (number.length == 10 || number.length == 11 || number.length == 9) {                    

            builder.Prompts.choice(session, `${number} ${consts.Prompts.CONFIRMATION}`, "Yes|No", {listStyle: builder.ListStyle.button});

        }else{
             session.replaceDialog('/contactnumber', { reprompt: true });
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