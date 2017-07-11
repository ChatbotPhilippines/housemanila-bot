'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const firstRun = require('./dialogs/firstRun');
const names = require('./dialogs/guestnames');
const guestlist = require('./dialogs/guestlist');
const mainMenu = require('./dialogs/mainMenu');

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

bot.dialog('/', firstRun);
bot.dialog('/mainMenu', mainMenu);
bot.dialog('/guestnames', names);
bot.dialog('/guestlist', guestlist);