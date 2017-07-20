'use strict';

//Declarations
const restify = require('restify');
const builder = require('botbuilder');
const config = require('./config');
const dialogs = require("./dialogs");
const request = require('request');
const mongoose = require('mongoose');
// const firstRun = require('./dialogs/firstRun');
// const menu = require('./dialogs/menu');
// const guestlist = require('./dialogs/guestlist');
// const bookTable = require('./dialogs/bookTable');
// const guestnames = require('./dialogs/guestnames');
// const request = require('request');
// const events = require('./dialogs/events');
// const tablerates = require('./dialogs/tablerates');
// const floorplan = require('./dialogs/floorplan');
// const birthday = require('./dialogs/birthday');
// const birthday2 = require('./dialogs/birthday2');
// const birthday3 = require('./dialogs/birthday3');       
// const bookevents = require('./dialogs/bookevents');
// const enteremail = require('./dialogs/enteremail');
// const reserve = require('./dialogs/tablereserve');
// const sevenFifteen = require('./dialogs/seven-fifteen');
// const sixteen = require('./dialogs/sixteen');
// const number = require('./dialogs/contactnumber');
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

bot.dialog('/mainMenu', dialogs.menu).triggerAction({matches:/mainMenu/i});
bot.dialog('/guestlist', dialogs.guestlist).triggerAction({matches:/Guest-List/i});
bot.dialog('/guestnames', dialogs.guestnames);
bot.dialog('/bookTable', dialogs.bookTable).triggerAction({matches:/Book-Table/i});
bot.dialog('/bookevents', dialogs.bookevents).triggerAction({matches:/Corporate-Functions/i});
bot.dialog('/firstRun', dialogs.firstRun).triggerAction({matches:/Get_Started/i});
bot.dialog('/events', dialogs.events).triggerAction({matches:/Events/i});
bot.dialog('/tablerates', dialogs.tablerates).triggerAction({matches:/table-rates/i});
bot.dialog('/floorplan', dialogs.floorplan).triggerAction({matches:/floor-plan/i});
bot.dialog('/birthday', dialogs.birthday);
bot.dialog('/birthday2', dialogs.birthday2);
bot.dialog('/birthday3', dialogs.birthday3);
bot.dialog('/enteremail', dialogs.enteremail);
bot.dialog('/tablereserve', dialogs.reserve);
bot.dialog('/seven-fifteen', dialogs.sevenFifteen);
bot.dialog('/sixteen', dialogs.sixteen);
bot.dialog('/contactnumber', dialogs.number);
bot.dialog('/test', [
  function(session){
var id = '596d94e775ed0a6bac40b708';
    var options = { method: 'GET',
  url: 'http://7d2fa0f4.ngrok.io/api/events',
  headers: 
   {
     'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  
  var events =JSON.parse(body); 
  console.log(JSON.parse(body));

for(var i= 0; i < d.length; i++){
eventName = events.d[i].event_name;
eventVenue = events.d[i].event_venue;
eventDate = events.d[i].event_date;
eventImage = events.d[i].event_image;
startTime = events.d[i].start_time;
endTime = events.d[i].end_time;
appId = events.d[i].app_id;
eventId = events.d[i]._id;


}
    });
  }
]).triggerAction({matches:/hi/i});




