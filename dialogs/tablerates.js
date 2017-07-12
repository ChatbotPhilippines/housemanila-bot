console.log("table rates");
var builder = require('botbuilder');
module.exports = [
    
    function (session) {        
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://i.imgur.com/fJsZQY6.png"
            }]);        
        session.endDialog(msg);
        builder.Prompts.choice(session, "Select: ", "Back|Buy Tickets", { listStyle: style });
    }   
]