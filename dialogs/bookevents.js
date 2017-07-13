'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        builder.Prompts.text(session, 'What is the name of your company?');
    },
    function(session, results){
        session.userData.company = results.response;
        builder.Prompts.text(session, 'What is your full name?');
    },
    function(session, results){
        session.userData.fullname = results.response;
        builder.Prompts.number(session, 'Please enter your contact number');
    },
    function(session, results){
        session.userData.contact = results.response;
        session.replaceDialog('/enteremail', session.userData.emailAdd);
    }
]