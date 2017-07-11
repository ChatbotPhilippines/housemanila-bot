'use strict';

//Declarations
var restify = require('restify');
var builder = require('botbuilder');
var Constants = require('./constants');

//=======================================================
// Bot Setup
//=======================================================

//Setup Restify Server
var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s is listening %s', server.name, server.url);
});


//Setup Bot
var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID || '205bddac-3dd5-466e-91de-a49e466250ba',
  appPassword: process.env.MICROSOFT_APP_PASSWORD || 'hVRQxv7t6yb4uVoVvwVdwg1'
});

var bot = new builder.UniversalBot(connector);
server.get(/\/assets\/?.*/, restify.serveStatic({
  directory: __dirname
}));
server.post('/api/messages', connector.listen());

//=======================================================
// Bot Middleware
//=======================================================

bot.use(builder.Middleware.dialogVersion({version: 1.0, resetCommand: /^reset/i}));
bot.use({
  botbuilder: function(session, next){
    if(session.message.text === 'GET_STARTED'){
      
    }
  }
})