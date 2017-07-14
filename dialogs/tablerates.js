console.log("table rates");
var builder = require('botbuilder');
var consts = require('../helpers/consts');
module.exports = [
    
    function (session) {        
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://i.imgur.com/fJsZQY6.png"
            }]);                   
        session.send(msg);
        builder.Prompts.choice(session, `Select: `, "Back|Buy Tickets", {listStyle: builder.ListStyle.button});

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == 'Buy Tickets'){
            session.send(consts.Messages.BUY_TICKETS);            
            session.endDialog();
        }else if (results.response.entity == 'Back'){            
            session.replaceDialog('/events'); 
        }
    }
]