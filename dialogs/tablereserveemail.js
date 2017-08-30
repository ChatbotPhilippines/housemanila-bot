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
            session.replaceDialog('/tablereserve', {reprompt: false});
        }
        else{
            session.replaceDialog('/tablereserveemail', {reprompt : true});
        }
    }
]