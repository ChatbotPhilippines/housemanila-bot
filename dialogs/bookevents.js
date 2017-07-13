'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        builder.Prompts.choice(session, 'Please answer the following information as correctly as possible.', 'Continue | Back', {listStyle: builder.ListStyle.button});
    },
    function(session, results){
        console.log('Ito yung nakuha ' + results.response.entity);
        if(results.response.entity === "Continue"){
            session.send("Tuloy book events");
        }
        else if(results.response.entity === "Back"){
            session.cancelDialog('/bookevents', '/mainMenu');
        }
    }
]