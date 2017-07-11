'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        var cards = getCards();
        var reply = new builder.Message(session).addAttachment(cards);
        builder.Prompts.choice(session, reply);
        
        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('Main Menu')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Main-Menu', 'Main Menu')
                ])
            ]
        }
    },
    function(session, results){
        if(results.response){
            session.beginDialog('/mainMenu');
        }
        else{
            session.send('Lol may error ka sa simula pa lang eww.');
        }
    }
]