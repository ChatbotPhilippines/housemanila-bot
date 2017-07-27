 'use strict';

 var builder = require('botbuilder');
 var consts = require('../helpers/consts');

 module.exports = [

    function(session){        
        builder.Prompts.text(session, consts.Messages.WELCOME);
        var cards = main_menu_card();

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards)

        session.send(reply);
        
    },
    function(session, results){
        console.log(JSON.stringify(session));
        console.log(JSON.stringify(results));
    }

    

 ]
 function main_menu_card(session){
    return [
        new builder.HeroCard(session)
            .title('House Manila')            
            .images([
                builder.CardImage.create(session, 'http://i.imgur.com/ie3lav5.jpg')
            ])
            .buttons([
                builder.CardAction.postBack(session, 'mainMenu', 'Main Menu')
            ])
    ]
}