var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');

module.exports = [

    function (session, args) {
        builder.Prompts.text(session, consts.Prompts.ENTER_NAMES);
    },
    function (session, results){
        session.userData.guests = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
        builder.Prompts.choice(session, `${consts.Messages.GUEST_LIST}<br/>${session.dialogData.names.guests.join('<br/>')}<br/>${consts.Prompts.CONFIRMATION}`, "Yes|No", {listStyle: builder.ListStyle.button});
    },
    function (session, results){
        if(results.response.entity === 'Yes'){
            
            session.send(consts.Messages.PENDING);
            session.endDialog();
        }
        else if(results.response.entity === 'No'){
            session.replaceDialog('/guestnames');
        }
    }
];