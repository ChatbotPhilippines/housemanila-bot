var builder = require('botbuilder');
var consts = require('../helpers/consts')

module.exports = [

    function (session){
            session.send("Here's the floor plan for this event");
                    var imgfloor = new builder.Message(session)
                        .addAttachment({
                            contentURL: 'http://i.imgur.com/fJsZQY6.png',
                            contentType: 'image/jpg',                            
                        });                    
                    session.send(imgfloor);
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