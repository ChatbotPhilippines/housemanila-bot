'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session, args){
        if(args && args.reprompt){
            builder.Prompts.text(session, 'Invalid e-mail address, please enter your e-mail address');
        }
        else{
            builder.Prompts.text(session, 'Please enter your email address.');
        }
    },
    function(session, results){
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailAdd = results.response;
        if(emailregex.test(emailAdd)){
            session.userData.emailAdd = results.response;
            builder.Prompts.time(session, 'When would you like to have the event? Enter the date and time.');
        }
        else{
            session.replaceDialog('/enteremail', {reprompt : true});
        }
    },
    function(session, results){
        session.userData.eventdate = results.response;
        session.endDialog('Thank you for the info! Our events officer will contact you within 24 hours for your inquiry.');
    }
]