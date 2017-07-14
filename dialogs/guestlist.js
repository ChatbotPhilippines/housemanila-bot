'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');

module.exports = [
    function(session, args){
        session.dialogData.party = args || {};
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
        session.send(consts.Prompts.EVENT);
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
        session.dialogData.party = results.response.entity;
        session.replaceDialog('/guestnames');
    }
]