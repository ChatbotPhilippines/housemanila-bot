var builder = require('botbuilder');

module.exports = [

    function (session, args) {
        session.dialogData.names = args || {};
        builder.Prompts.text(session, 'Please enter the names you would like to add in the guest list (separated by a comma):');
    },
    function (session, results){
        session.dialogData.names.guests = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
        builder.Prompts.choice(session, `The following people will be part of the guest list ${session.dialogData.names.guests.join('<br/>')}<br/>Is this confirmed?`, "Yes|No", {listStyle: builder.ListStyle.button});
    },
    function (session, results){
        if(results.response.entity === 'Yes'){
            session.send('You are now pending for approval in our guest list! You will receive a message once you get approved. Thank you!');
            session.endDialog();
        }
        else if(results.response.entity === 'No'){
            session.replaceDialog('/guestnames');
        }
    }
];