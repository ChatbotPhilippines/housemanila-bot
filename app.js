'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const firstRun = require('./dialogs/firstRun');
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



bot.dialog('/', firstRun);
bot.dialog('/guestlist', guestlist);
bot.dialog('/guestnames', names);
bot.dialog('/bookTable', bookTable);
