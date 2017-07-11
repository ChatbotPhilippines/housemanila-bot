'use strict';

var builder = require('botbuilder');


module.exports = [
    function(session){
        var selectArray = [
            "DROP",
            "RSVP",
            "Organized Chaos",
            "We Own The Night"
        ];

        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("Which event would you like to get in the guest list for?");
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('DROP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'DROP', 'DROP')
                ]),

                new builder.HeroCard(session)
                .title('RSVP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'RSVP', 'RSVP')
                ]),

                new builder.HeroCard(session)
                .title('Organized Chaos')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Organized', 'Organized Chaos')
                ]),

                new builder.HeroCard(session)
                .title('We Own The Night')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'WOTN', 'We Own The Night')
                ])
            ]
        }
    },
    function (session, results){
        if (results.response){
            var reply = results.response.entity;
            switch (reply){
                case 'DROP':
                    session.replaceDialog('/guestnames');
                break;

                case 'RSVP':
                    session.beginDialog('/guestnames');
                break;

                case 'Organized':
                    session.beginDialog('/guestnames');
                break;

                case 'WOTN':
                    session.beginDialog('/guestnames');
                break;

                default:
                    session.send('May error ka lol.');
            }
        }
        else{
            session.send('May error ka din lol.');
        }

        session.endDialog();
    }
]