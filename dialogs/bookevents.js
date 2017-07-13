'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session, args){
        session.dialogData.events = args || {};
        builder.Prompts.text(session, 'What is the name of your company?');
    },
    function(session, results){
        session.dialogData.events.company = results.response;
        builder.Prompts.text(session, 'What is your full name?');
    },
    function(session, results){
        session.dialogData.events.fullname = results.response;
        builder.Prompts.number(session, 'Please enter your contact number');
    },
    function(session, results){
        session.dialogData.events.contact = results.response;
        session.replaceDialog('/enteremail', session.userData.emailAdd);
    },
    function(session, results){
        session.dialogData.email = results.response;
        builder.Prompts.time(session, 'When would you like to have the event? Enter the date and time');
    },
    function(session, results){
        session.endDialog('Thank you for the info! Our events officer will contact you within 24 hours for your inquiry.');
    }
]