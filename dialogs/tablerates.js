console.log("table rates");
var builder = require('botbuilder');
module.exports = [
    
    function (session) {        
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://i.imgur.com/fJsZQY6.png"
            }]);
        builder.Prompts.confirm(session, `Is this confirmed?`);
        //session.endDialog(msg);
    },
    function (session, results) {
        console.log(results.response + "results");
        var choice = results.response ? 'yes' : 'no';
        if (choice === 'yes') {
            session.endDialogWithResult(session.dialogData.party);
        } else {
            session.replaceDialog('/ensure-party');
        }
    }
]