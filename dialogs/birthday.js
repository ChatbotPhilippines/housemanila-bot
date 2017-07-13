'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session){
        // var reply = new builder.Message(session).text('Awesome! Any special requests?');
        // session.send(reply);
        builder.Prompts.choice(session, `Awesome! Any special requests?`, "Balloons|Party Poopers|Sparklers|Cake|Bottle Parade|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){  
        console.log(results.response.entity);
        if (results.response.entity == 'Others'){            
            builder.Prompts.text(session, 'Please enter a message for your special request now 🙂');
        }
        else if (results.response != null){
            session.replaceDialog('/birthday2'); 
        }
    },
    function(session,results){  
        
        builder.Prompts.choice(session, `Got it! We'll get back to you about your request if this is possible 🙂`, "Continue", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){  
        
        if(results.response.entity == 'Continue'){
            session.replaceDialog("/tablereserve");
        }
        

    }

]