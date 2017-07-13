'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session){
        // var reply = new builder.Message(session).text('Awesome! Any special requests?');
        // session.send(reply);
        builder.Prompts.choice(session, `What else would you like to add?`, "Balloons|Party Poopers|Sparklers|Cake|Bottle Parade|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response != null){
            session.replaceDialog('/birthday2'); 
        }else if (results.response.entity == 'Back'){            
            session.replaceDialog('/events'); 
        }
    }

]