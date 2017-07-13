'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        builder.Prompts.choice(session, 'Please answer the following information as correctly as possible.', 'Continue | Back', {listStyle: builder.ListStyle.button});
    },
    function(session, results){
        console.log('Ito yung nakuha ' + results.response.entity);
        session.send('Hahahaha lolz');
    }
]