'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session, args){
        session.dialogData.emailAdd = args || {};
        builder.Prompts.text(session, 'Please enter your email address.');
    },
    function(session, results){
        var emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var emailAdd = session.dialogData.emailAdd = results.response;
        if(emailregex.test(emailAdd)){
            session.endDialogWithResult({response: session.dialogData.emailAdd});
        }
        else{
            session.replaceDialog('/enteremail');
        }
    }
]