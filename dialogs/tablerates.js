console.log("table rates");
var builder = require('botbuilder');
module.exports = [
    
    function (session) {        
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://i.imgur.com/fJsZQY6.png"
            }]);        
            msg.sourceEvent({
            facebook: {
                quick_replies: [
                    {
                        content_type: 'text',
                        title: 'Back',
                        payload: 'backToEvents',
                    },
                    {
                        content_type: 'text',
                        title: 'Buy Tickets',
                        payload: 'buyTickets'
                    }
                ]
            }
        });

        session.endDialog(msg);
        
    },
    
    function(session, results){
        console.log(results.response);        

    }
]