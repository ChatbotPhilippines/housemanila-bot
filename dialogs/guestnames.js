var builder = require('botbuilder');

module.exports = [

    function (session, args, next) {
        builder.Prompts.text(session, 'Please enter the names you would like to add in the guest list (separated by a comma):');
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.party = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
            builder.Prompts.confirm(session, `${session.dialogData.party.join('<br/>')}<br/>Is this confirmed?`)
        }
    },
    function (session, results) {
        var choice = results.response ? 'yes' : 'no';
        if (choice === 'yes') {
            session.endDialogWithResult(session.dialogData.party);
        } else {
            session.replaceDialog('/guestList');
        }
    }
];
