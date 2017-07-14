 'use strict';

 var builder = require('botbuilder');

 module.exports = [

    function(session){        
        var cards = main_menu_card();

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards)

        session.send(reply);
    }

    

 ]
 function main_menu_card(session){
    return [
        new builder.HeroCard(session)
            .title('House Manila')
            .subtitle('Hey I\'m House Manila Bot here to make your partying easier! 🎉🎉🎉 Click the button below to start!')
            .images([
                builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
            ])
            .buttons([
                builder.CardAction.postBack(session, 'mainMenu', 'Main Menu')
            ])
    ]
}