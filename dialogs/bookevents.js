'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts')

module.exports = [
    function(session){
        builder.Prompts.text(session, consts.Prompts.COMPANY_NAME);
    },
    function(session, results){
        session.userData.company = results.response;
        builder.Prompts.text(session, consts.Prompts.FULL_NAME);
    },
    function(session, results){
        session.userData.fullname = results.response;
        builder.Prompts.number(session, consts.Prompts.CONTACT_NUMBER);
    },
    function(session, results){
        session.userData.contact = results.response;
        session.replaceDialog('/enteremail', session.userData.emailAdd);
    }
]