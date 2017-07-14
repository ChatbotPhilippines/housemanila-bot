
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
const birthday = require('./dialogs/birthday');
const birthday2 = require('./dialogs/birthday2');
const birthday3 = require('./dialogs/birthday3');       
const bookevents = require('./dialogs/bookevents');
const enteremail = require('./dialogs/enteremail');
const reserve = require('./dialogs/tablereserve');
const sevenFifteen = require('./dialogs/seven-fifteen');
const sixteen = require('./dialogs/sixteen');
const number = require('./dialogs/contactnumber');
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

// bot.dialog('/firstRun', [
    
// ]).triggerAction({matches:/Get_Started/i});

bot.dialog('/mainMenu', menu).triggerAction({matches:/mainMenu/i});
bot.dialog('/guestlist', guestlist);
bot.dialog('/guestnames', guestnames);
bot.dialog('/bookTable', bookTable);
bot.dialog('/bookevents', bookevents);
bot.dialog('/firstRun', firstRun).triggerAction({matches:/Get_Started/i});
bot.dialog('/events', events);
bot.dialog('/tablerates', tablerates);
bot.dialog('/floorplan', floorplan);
bot.dialog('/birthday', birthday);
bot.dialog('/birthday2', birthday2);
bot.dialog('/birthday3', birthday3);
bot.dialog('/enteremail', enteremail);
bot.dialog('/tablereserve', reserve);
bot.dialog('/seven-fifteen', sevenFifteen);
bot.dialog('/sixteen', sixteen);
bot.dialog('/contactnumber', number);
