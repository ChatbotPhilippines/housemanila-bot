 'use strict';

// var builder = require('botbuilder');

 module.exports = [
        
    function(session){
        var selectArray = [
            "Guest-List",
            "Book-Table",
            "Events",
            "Corporate-Functions"
        ];

        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("What can I do for you?");
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('Guest List')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Guest-List', 'Guest List')
                ]),

                new builder.HeroCard(session)
                .title('Book a Table')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Book-Table', 'Book a Table')
                ]),

                new builder.HeroCard(session)
                .title('Events')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Events', 'See Upcoming Events')
                ]),

                new builder.HeroCard(session)
                .title('Corporate Functions')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Corporate-Functions', 'Book an Event')
                ])
            ]
        }
    },
    function (session, results){
        if (results.response){
            var reply = results.response.entity;
            switch (reply){
                case 'Guest-List':
                    session.replaceDialog('/guestlist');
                break;

                case 'Book-Table':
                    session.replaceDialog('/bookTable');
                break;

                case 'Events':
                    session.replaceDialog('/events');
                break;

                case 'Corporate-Functions':
                    session.replaceDialog('/corporateFunctions');
                break;

                default:
                    session.send('May error ka lol.');
            }
        }
        else{
            session.send('May error ka din lol.');
        }
    }
]