console.log("table rates");
var builder = require('botbuilder');
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
        if (results.response == 'Buy Tickets'){
            session.send('For tickets or table reservations, you may contact +639272204244 🙂');            
        }else{
            session.replaceDialog('/tablerates'); 
        }
    }
]