var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');

module.exports = [

    function (session, args) {
        builder.Prompts.text(session, consts.Prompts.ENTER_NAMES);
    },
    function (session, results){
        session.userData.guests = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
        console.log("Userdata mo ito" + session.userData.guests);
        builder.Prompts.choice(session, `${consts.Messages.GUEST_LIST}<br/>${session.userData.guests.join('<br/>')}<br/>${consts.Prompts.CONFIRMATION}`, "Yes|No", {listStyle: builder.ListStyle.button});
    },
    function (session, results){
        if(results.response.entity === 'Yes'){            

            var options = {
            method: 'POST',
            url: 'https://a591c982.ngrok.io/api',
            headers: 
            { 
                'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q',
                'content-type': 'application/json' 
            },
            qs:{
                    MSpointname: "events", //user, session, aimodule, member, Basta microservice name                
            },
            body: 
            {   guests: session.userData.guests,
                event_id: session.userData.party,
                app_dtl: { 
                    app_name: 'House Manila', 
                    app_code: 'hm' 
                } 
            },
            json: true 
            };

            request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
            });

            session.send(consts.Messages.PENDING);
            session.endDialog();
        }
        else if(results.response.entity === 'No'){
            session.replaceDialog('/guestnames');
        }
    }
];