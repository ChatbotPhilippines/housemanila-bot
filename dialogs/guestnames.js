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
            request({
                uri: 'https://guestlist-app-hm.herokuapp.com/api/guestlist',
                method: 'POST',
                headers: {
                    'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q'
                },
                body: JSON.stringify({
                    guests: session.userData.guests,
                    event_id: session.userData.party,
                    app_dtl: {
                        app_name: "House Manila",
                        app_code: "hm"
                    }
                })
            }, (error, response, body) => {
                console.log(body);
                console.log(response);
                console.log(error);
            })
            session.send(consts.Messages.PENDING);
            session.endDialog();
        }
        else if(results.response.entity === 'No'){
            session.replaceDialog('/guestnames');
        }
    }
];