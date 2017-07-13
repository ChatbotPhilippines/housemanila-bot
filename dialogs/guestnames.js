var builder = require('botbuilder');

module.exports = [

    function (session) {
        builder.Prompts.text(session, 'Please enter the names you would like to add in the guest list (separated by a comma):');
    },
    function (session, results){
        session.dialogData.guestlist.names = results.response;
        session.endDialogWithResult({response: session.dialogData.guestlist.names});
    }
];