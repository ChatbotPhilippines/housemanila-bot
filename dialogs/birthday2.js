'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session){
        // var reply = new builder.Message(session).text('Awesome! Any special requests?');
        // session.send(reply);
        builder.Prompts.choice(session, `Is that all?`, "Add another|Yes, continue", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == 'Add another'){
            session.replaceDialog('/birthday3'); 
        }else if (results.response.entity == 'Yes, continue'){            
            //session.replaceDialog('/events'); under whose name
        }
    }

]