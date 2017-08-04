'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');

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
        
        session.endDialog(consts.Messages.THANK_INFO);
    }
]