'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');

module.exports = [
    function(session, args){
        if(args && args.reprompt){
            builder.Prompts.text(session, consts.Messages.INVALID_EMAIL);
        }
        else{
            builder.Prompts.text(session, consts.Prompts.ENTER_EMAIL);
        }
    },
    function(session, results){
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailAdd = results.response;
        if(emailregex.test(emailAdd)){
            session.userData.emailAdd = results.response;
            builder.Prompts.time(session, consts.Prompts.ENTER_DATE_TIME);
        }
        else{
            session.replaceDialog('/enteremail', {reprompt : true});
        }
    },
    function(session, results){
        session.userData.eventdate = builder.EntityRecognizer.resolveTime([results.response]);
        console.log(`${session.userData.company}, 
                     ${session.userData.fullname},
                     ${session.userData.contact},
                     ${session.userData.emailAdd},
                     ${session.userData.eventdate}`);
        
        var options = {
            method: 'POST',
            url: 'https://ms-gateway-api.herokuapp.com/api',
            qs: {
                MSpointname: 'eventbooking',
                client: 'housemanila'
            },
            headers: {
                'content-type': 'application/json',
                'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q'
            },
            body: {
                event_date: session.userData.eventdate,
                producer: {
                    name: session.userData.company,
                    contact_number: session.userData.contact,
                    organizer_name: session.userData.fullname,
                    email_address: session.userData.emailAdd
                },
                status: 'Pending',
                app_dtl: {
                    app_name: "house manila",
                    app_code: "123"
                }   
            },
            json: true
        };

        request(options, function(error, response, body) {
            if(error) throw new Error(error);
            console.log(body);
        });

        var content = `
            ${session.userData.company} is requesting to book an event in House Manila.

            Name of Organizer: ${session.userData.fullname}
            Contact Number: ${session.userData.contact}
            Email Address: ${session.userData.emailAdd}
            Event Date: ${session.userData.eventdate}
        `
        
        session.endDialog(consts.Messages.THANK_INFO);
    }
]

function sendEmail(content, event) {

	var api_key = 'key-2cc6875066bce7da401337300237471d';
	var domain = 'sandboxb18d41951b2a4b58a7f2bcdc7a7048f8.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

	var data = {
	from: 'Event Bookings <postmaster@sandboxb18d41951b2a4b58a7f2bcdc7a7048f8.mailgun.org>',
	to: 'romedorado@gmail.com',
	//cc: 'marlo.lucio@honestbee.com',
	subject: `Event Booking Request from ${session.userData.company}`,
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