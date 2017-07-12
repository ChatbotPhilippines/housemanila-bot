'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        var reply = new builder.Message(session).text('Are you celebrating anything special? :)');

        reply.sourceEvent({
            facebook: {
                quick_replies: [
                    {
                        content_type: 'text',
                        title: 'Birthday',
                        payload: 'bookBirthday',
                    },
                    {
                        content_type: 'text',
                        title: 'Anniversary',
                        payload: 'bookAnniversary'
                    },
                    {
                        content_type: 'text',
                        title: 'Despedida',
                        payload: 'bookDespidida'
                    },
                    {
                        content_type: 'text',
                        title: 'Bachelor/ette',
                        payload: 'bookBachelor'
                    },
                    {
                        content_type: 'text',
                        title: 'Others',
                        payload: 'bookOthers'
                    },
                    {
                        content_type: 'text',
                        title: 'No Occasion',
                        payload: 'bookNoOccasion'
                    }
                ]
            }
        });
        session.send(reply);
    },
    function(session, results){
        var occasion = results.response;
    }
]