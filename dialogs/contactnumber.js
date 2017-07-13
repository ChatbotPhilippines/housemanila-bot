'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        builder.Prompts.number(session, 'Okay. Please enter your contact number now.');                    

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity != null){

            builder.Prompts.confirm(session, `${session.dialogData.numbers} Is this confirmed?`);

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