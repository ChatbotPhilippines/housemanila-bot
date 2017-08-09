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
        console.log(session.message.user.name + "this is the name")
        if(results.response.entity === 'Yes'){            

            var options = {
            method: 'POST',
            url: 'https://ms-gateway-api.herokuapp.com/api',
            headers: 
            { 
                'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q',
                'content-type': 'application/json' 
            },
            qs:{
                    client: "housemanila",
                    MSpointname: "guestlist", //user, session, aimodule, member, Basta microservice name                
            },
            body: 
            {   
                referral_name: session.message.user.name,
                guests: session.userData.guests,
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
        var content = `
        Here are the list of people who requested to be part of the guestlist for ${session.userData.partyname}: 
        ${session.userData.guests}`;
        sendEmail(content, session.userData.partyname);
    }
    
];

function sendEmail(content, event) {

	var api_key = 'key-2cc6875066bce7da401337300237471d';
	var domain = 'sandboxb18d41951b2a4b58a7f2bcdc7a7048f8.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

	var data = {
	from: 'Guestlists <postmaster@sandboxb18d41951b2a4b58a7f2bcdc7a7048f8.mailgun.org>',
	to: 'romedorado@gmail.com',
	//cc: 'marlo.lucio@honestbee.com',
	subject: `Guestlist for ${event}`,
	text: content
	};
//
	mailgun.messages().send(data, function (error, body) {
	console.log(body);
	if(!error){
		console.log("NO ERROR SENDING EMAIL!");
		}
	});
}