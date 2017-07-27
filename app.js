'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const dialogs = require("./dialogs");
const request = require('request');
const mongoose = require('mongoose');

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
    // console.log(JSON.stringify(session));
    // console.log(session.message.text);
        session.replaceDialog('/wit');
    }
]);
bot.dialog('/mainMenu', dialogs.menu).triggerAction({matches:/mainMenu/i});
bot.dialog('/guestlist', dialogs.guestlist).triggerAction({matches:/Guest-List/i});
bot.dialog('/guestnames', dialogs.guestnames);
bot.dialog('/bookTable', dialogs.bookTable).triggerAction({matches:/Book-Table/i});
bot.dialog('/bookevents', dialogs.bookevents).triggerAction({matches:/Corporate-Functions/i});
bot.dialog('/firstRun', dialogs.firstRun).triggerAction({matches:/Get_Started/i});
bot.dialog('/events', dialogs.events).triggerAction({matches:/Events/i});
bot.dialog('/tablerates', dialogs.tablerates).triggerAction({matches:/table-rates/i});
bot.dialog('/floorplan', dialogs.floorplan).triggerAction({matches:/floor-plan/i});
bot.dialog('/enteremail', dialogs.enteremail);
bot.dialog('/tablereserve', dialogs.reserve);
bot.dialog('/seven-fifteen', dialogs.sevenFifteen);
bot.dialog('/sixteen', dialogs.sixteen);
bot.dialog('/contactnumber', dialogs.number);
bot.dialog('/wit', [

function (session, results, next) {
  session.send("HAHAHA ulol");
}
]);




