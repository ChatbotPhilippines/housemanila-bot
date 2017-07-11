'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const firstRun = require('./dialogs/firstRun');
const guestlist = require('./dialogs/guestlist');
const bookTable = require('./dialogs/bookTable');

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
bot.dialog('/guestnames', [  
    function (session, args, next) {
        builder.Prompts.text(session, 'Please enter the names you would like to add in the guest list (separated by a comma):');
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.party = results.response.split(/[,\n]+/).map(function (x) { return x.trim(); }) || [];
            builder.Prompts.confirm(session, `${session.dialogData.party.join('<br/>')}<br/>Is this confirmed?`)
        }
    },
    function (session, results) {
        var choice = results.response ? 'yes' : 'no';
        if (choice === 'yes') {
            session.endDialogWithResult(session.dialogData.party);
        } else {
            session.replaceDialog('/ensure-party');
        }
    }
]);


//bot.dialog('/guestnames', names);
bot.dialog('/bookTable', bookTable);
