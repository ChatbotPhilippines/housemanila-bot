'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const dialogs = require('dialogs');

//=======================================================
// Bot Setup
//=======================================================

//Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s is listening %s', server.name, server.url);
});
server.post('/api/messages', connector.listen());

//Setup Bot
var connector = new builder.ChatConnector({
  appId: config.appID,
  appPassword: config.appPassword
});
var bot = new builder.UniversalBot(connector);

//=======================================================
// Start of Conversation
//=======================================================

bot.dialog('/', dialogs.firstRun);
