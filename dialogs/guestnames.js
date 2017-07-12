var builder = require('botbuilder');

module.exports = [

    function (session) {
        builder.Prompts.text(session, 'Please enter the names you would like to add in the guest list (separated by a comma):');
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.party = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
            builder.Prompts.confirm(session,`You entered: ${results.response} \n 'Is this confirmed?`)
        }
     },
     function (session, results) {
         var choice = results.response ? 'yes' : 'no';
         if (choice === 'yes') {
             session.endDialogWithResult(session.dialogData.party);
         } else {
             session.replaceDialog('/guestlist');
        }
    }
];
