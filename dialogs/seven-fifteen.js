'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session, args){
        session.dialogData.number = args || {};
        builder.Prompts.number(session, 'Alright! Lastly, please enter your contact number so we can send a confirmation code once your table is approved.');                    

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity != null){

            builder.Prompts.confirm(session, `${session.dialogData.number} Is this confirmed?`);

        }
        
    },
    function(session,results){   
        console.log(results.response.entity);
        if(results.response.entity == "yes"){

            session.send(session, `Thank you! A confirmation code will be sent to ${session.dialogData.numbers} within 24 hours to confirm the reservation 🙂`)

        }else if (results.response.entity == "no"){
            session.replaceDialog("/contactnumber");
        }

    }

]