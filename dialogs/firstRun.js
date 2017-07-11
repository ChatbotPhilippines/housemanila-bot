'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        var reply = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                .title("House Manila Bot")
                .subtitle("Wanna party tonight? Click Main Menu so I can help!")
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Main-Menu', 'Main Menu')
                ])
            ])
    }
]