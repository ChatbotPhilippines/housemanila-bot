 'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts')

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
        session.send(consts.Messages.MAIN_MENU);
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});        

        function getCards(session){
            return [
                 new builder.HeroCard(session)
                .title('Guest List')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/tfTpWHV.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Guest-List', 'Guest List')
                ]),

                new builder.HeroCard(session)
                .title('Book a Table')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/ycFA68n.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Book-Table', 'Book a Table')
                ]),

                new builder.HeroCard(session)
                .title('Events')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/vJIeMGH.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Events', 'See Upcoming Events')
                ]),

                new builder.HeroCard(session)
                .title('Corporate Functions')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/63n9SnY.jpg')
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
                    session.replaceDialog('/bookevents');
                break;

                default:
                    session.replaceDialog('/wit');
            }
        }
        else{
            session.replaceDialog('/wit');
        }
    }
]