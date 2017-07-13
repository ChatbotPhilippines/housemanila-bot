'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        builder.Prompts.number(session, 'Okay. Please enter your contact number now.');                    

    },
    function(session,results){   
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        if (results.response.entity != null){
            

            builder.Prompts.choice(session, `${session.dialogData.numbers.phone} Is this confirmed?`);

        }
        
    },
    function(session,results){   
        console.log(results.response);
        if(results.response == "yes"){
            session.send(session, `Thank you! A confirmation code will be sent to ${session.dialogData.numbers.phone} within 24 hours to confirm the reservation 🙂`)
        }else if (results.response == "no"){
            session.replaceDialog("/contactnumber");
        }

    }

]