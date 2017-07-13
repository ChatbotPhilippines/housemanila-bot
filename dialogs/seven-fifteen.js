'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        builder.Prompts.number(session, 'Alright! Lastly, please enter your contact number so we can send a confirmation code once your table is approved.');                    

    },
    function(session,results){   
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        if (results.response != null){
            
            builder.Prompts.choice(session, `${session.dialogData.numbers.phone} Is this confirmed?`, "Yes|No", {listStyle: builder.ListStyle.button});

        }
        
    },
    function(session,results){   
        console.log(results.response.entity);
        if(results.response.entity == "Yes"){

            session.send(session, `Thank you! A confirmation code will be sent to ${session.dialogData.numbers.phone} within 24 hours to confirm the reservation 🙂`)

        }else if (results.response.entity == "No"){
            session.replaceDialog("/contactnumber");
        }

    }

]