'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const dialogs = require("./dialogs");
const request = require('request');
const mongoose = require('mongoose');
var WIT_TOKEN = '3BFUICWEDOOHQBM5KCAXLVSMDAL653J6';
const {Wit, log} = require('node-wit');

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

var model = process.env.model ||
    'https://api.projectoxford.ai/luis/v1/application?id=6c4a0d3e-41ff-4800-9ec7-8fd206ee41e8&subscription-key=692f717f9c3b4f52b852d51c46358315&q=';
var recognizer = new builder.LuisRecognizer(model)
var intentDialog = new builder.IntentDialog({
    recognizers: [recognizer],
    intentThreshold: 0.5,
    recognizeMode: builder.RecognizeMode.onBegin
});

//=======================================================
// Start of Conversation
//=======================================================



bot.dialog('/', [
    function(session){
        if(session.message.text != "Get_Started"){
          session.replaceDialog('/wit');
        }
    }
]);

bot.dialog('/wit', [

function (session, results, next) {
  session.send("HAHAHA ulol");
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


// intentDialog.onDefault([
//     function (session, next) {
//         session.replaceDialog('/wit');
//     }
    
// ]);


