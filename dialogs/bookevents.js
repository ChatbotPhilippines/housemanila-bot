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
        builder.Prompts.text(session, 'Please enter your email address');
    },
    function(session, results){
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailAdd = session.dialogData.emailAdd = results.response;
        if(emailregex.test(emailAdd)){
            session.send('Tamang email');
        }
    }
]