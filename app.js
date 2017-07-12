'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const firstRun = require('./dialogs/firstRun');
const menu = require('./dialogs/menu');
const guestlist = require('./dialogs/guestlist');
const bookTable = require('./dialogs/bookTable');
const names = require('./dialogs/guestnames');
const PAGE_ACCESS_TOKEN = 'EAAcMbSiRTlABADmflfXlqOWKZBh56eD9ruT9eRwC2oG8UhSndDgUJDZCnsPZAubrfGkRYtUb21qecZCDAlXlElJTQNfUsZBM5kXKBoeUSHJ4esAKhfhqHZCVwZAf3xbqniZCDAbaBJwmHwGWUnSHXhr29batAE5C4jeZBm7s9U9ZBj4gZDZD';
const request = require('request');
const events = require('./dialogs/events')
//=======================================================
// Bot Setup
//=======================================================
//Setup Bot
var connector = new builder.ChatConnector({
  appId: config.appID,
  appPassword: config.appPassword
});
var bot = new builder.UniversalBot(connector);


//Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s is listening %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());


//=======================================================
// Start of Conversation
//=======================================================



bot.dialog('/', [
  function(session){
        session.beginDialog('/firstRun');
    }
]);

bot.dialog('/firstRun', [
    function(session){        
        var cards = main_menu_card();

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards)

        session.send(reply);
    }
]).triggerAction({matches:/Get_Started/i});

bot.dialog('/mainMenu', menu).triggerAction({matches:/mainMenu/i});
bot.dialog('/guestlist', guestlist);
//bot.dialog('/guestnames', names);
bot.dialog('/bookTable', bookTable);
bot.dialog('/events', events);

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

// bot.dialog('/mainMenu', [
//     function(session){        
//         var cards = main_menu();

//         var reply = new builder.Message(session)
//             .attachmentLayout(builder.AttachmentLayout.carousel)
//             .attachments(cards)

//         session.send(reply);
//         session.endDialog();
//     }
// ]).triggerAction({matches:/mainMenu/i});

// function main_menu(session){
//     return [
//     new builder.HeroCard(session)
//         .title('Guest List')        
//         .images([
//             builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
//         ])
//         .buttons([
//             builder.CardAction.postBack(session, 'guestList', 'Guest List')
//         ]),

//     new builder.ThumbnailCard(session)
//         .title('Book Table')        
//         .images([
//             builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
//         ])
//         .buttons([
//             builder.CardAction.postBack(session, 'bookTable', 'Book Table')
//         ]),
    
//     new builder.HeroCard(session)
//         .title('Events')        
//         .images([
//             builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
//         ])
//         .buttons([
//             builder.CardAction.postBack(session, 'events', 'Events')
//         ]),
//     new builder.ThumbnailCard(session)
//         .title('Corporate Functions')        
//         .images([
//             builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
//         ])
//         .buttons([
//             builder.CardAction.postBack(session, 'corporateFunctions', 'Corporate Functions')
//         ])
//     ]
// }
