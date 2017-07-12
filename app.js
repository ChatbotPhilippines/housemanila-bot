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
        var cards = main_menu();

        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards)

        session.send(reply);
        session.endDialog();
    }
]).triggerAction({matches:/Get_Started/i});

function main_menu(session){
    return [
        new builder.HeroCard(session)
            .title('House Manila')
            .subtitle('Check out the best selling books this month')
            .images([
                builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
            ])
            .buttons([
                builder.CardAction.postback(session, 'mainMenu', 'Main Menu')
            ])
            ]
        }


bot.dialog('/guestlist', guestlist);
bot.dialog('/guestnames', names);
bot.dialog('/bookTable', bookTable);
