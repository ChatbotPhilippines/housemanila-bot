
'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const firstRun = require('./dialogs/firstRun');
const menu = require('./dialogs/menu');
const guestlist = require('./dialogs/guestlist');
const bookTable = require('./dialogs/bookTable');
const guestnames = require('./dialogs/guestnames');
const request = require('request');
const events = require('./dialogs/events');
const tablerates = require('./dialogs/tablerates');
const floorplan = require('./dialogs/floorplan');
const bookevents = require('./dialogs/bookevents');

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
bot.dialog('/guestnames', guestnames);
bot.dialog('/bookTable', bookTable);
bot.dialog('/bookevents', bookevents);
bot.dialog('/events', events);
bot.dialog('/tablerates', tablerates);
bot.dialog('/floorplan', floorplan);
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