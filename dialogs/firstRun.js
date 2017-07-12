'use strict';

var builder = require('botbuilder');

module.exports = [
        
    function(session){        
        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);        
        builder.Prompts.choice(session, reply, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('Guest List')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'main-menu', 'Main Menu')
                ]),                
            ]
        }
    },
    function (session, results){
        if (results.response){
            var reply = results.response.entity;
            switch (reply){
                case 'main-menu':
                    session.replaceDialog('/mainmenu');
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