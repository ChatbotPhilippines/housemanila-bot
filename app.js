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

function (session, args, next) {
  
  var entity = args || session.message.text;
  const client = new Wit({accessToken: WIT_TOKEN});

        client.message(entity, {})
        .then((data) => {
            var results = data;
            var entities = results.entities;

            // if(Object.keys(entities).length == 0){
            //    if(entity !== 'GET_STARTED'){session.send('Sorry, I didn’t quite understand that yet since I’m still a learning bot. Let me store that for future reference. In the mean time, you may contact +639176808888 or type “Menu” if you want to find out the cool things I can do for you!');}
            // }else{
                var intent = entities.intent[0].value;

                if(('inquiry_type' in entities)){var inquiry_type = entities.inquiry_type[0].value;}
                if(('emotions' in entities)){var emotion = entities.emotions[0].value;}
                getWitIntents(intent, inquiry_type,  emotion, session);

            // }
        })
        .catch(console.error);

  
}
]);

function getWitIntents(intent, inquiry_type, emotion, session){

    switch(intent){

        case 'get_greetings':
            let random = [ 'Hey, {{fb_first_name}}! Welcome to House Manila! How may I help you?',
                                'Heeyy!! What can I do for you today?',
                              'Sup! What can I do for you today?',
                            'Hi there! 🎉  Type "Menu" to start partying with us!' ];
            let reply = random[Math.floor(Math.random() * random.length)];
            session.send(reply);
        break;

        case 'get_menu':
            session.beginDialog('/mainMenu');
        break;

        case 'get_farewell':
            session.send('Thanks, {{fb_first_name}}! See you at House Manila! Just hit me up whenever you need me :)');
        break;

        case 'get_compliment':
            let randomcomp = [ 'Aww, thanks! Appreciate it, {{fb_first_name}}!',
                                '🙈🙈🙈' ];
            let replycomp = randomcomp[Math.floor(Math.random() * randomcomp.length)];
            session.send(replycomp);
        break;

        case 'get_thanks':
            session.send('No biggie! See you at House Manila!');
        break;

        case 'get_profanity':
            let randomprof = ['Hey! Sorry for whatever prompted you to say that. To make your experience better, why not party with us at House Manila? :)',
                              '💩💩💩',
                            'Duuuuude!',
                          'Ey dude, that\'s not cool!'];
            let replyprof = randomprof[Math.floor(Math.random() * randomprof.length)];
            session.send(replyprof);
        break;
        
        case "get_inquiry":
            switch(inquiry_type){
                case 'about':
                    session.send("House Manila is the hippest and the newest party place and entertainment spot.")
                    session.send('We can accommodate 400 pax (seating) and 1, 200 pax (standing). We are good for all kinds of events such as: company/corporate events, product launching, press launch, school events, debuts, wedding reception, concerts, and etc.')
                break;

                case 'origin':
                    session.send("Suh dude! I'm House Manila bot, here to make your partying with us easier!");
                break;

                case 'photos':
                    session.send("Photos are up on FB by Monday night. You may check and tag your photos by then.");
                break;

                case 'operations':
                    session.send("You can party with us from Wednesday to Saturday, from 10pm onwards.");
                break;

                case 'guest list':
                    session.beginDialog('/guestlist');
                break;

                case 'tables':
                    session.send("We offer the following Birthday packages: \nPHP 5,000\nPHP 10,000\nPHP 15,000\nPHP 20,000\nPHP 30,000\nPHP 50,000\nAs well as a Clubbers' package at PHP 7,000.");
                break;

                case 'events':
                    session.beginDialog('/events');
                break;

                case 'careers':
                    session.send("You may send your résumé to housemanilaph@gmail.com. :)");
                break;

                case 'private':
                    session.send("Of course, dude! ");
                    session.send("For event bookings & inquiries, you may text or Viber us at 09159657715 or 09166387666, or e-mail us at housemanilaph@gmail.com.");
                break;

                case 'location':
                    session.send("We are located at the Remington Hotel, Resorts World Manila.");
                break;

                case 'contacts':
                    session.send("For event bookings & inquiries\nText us or Viber: 09159657715 or 09166387666\nE-mail: housemanilaph@gmail.com\nTable reservations: reservation@housemanila.com\nFacebook: HouseManilaOfficial\nInstagram/Twitter: @HouseManilaPH");
                break;

                case 'dress code':
                    session.send("Please check out this poster for more details:");
                break;

                case 'payments':
                    session.send("We accept Cash, Visa, American Express, and Mastercard.");
                break;

                case 'lost':
                    session.send("We are located at the Remington Hotel, Resorts World Manila.");
                break;

                case 'services':
                    session.send("We take table reservations, private bookings, and walk-ins.");
                break;

                case 'policies':
                    session.send("Please check out this poster for more details:");
                break;

                case 'help':
                    session.send("How may I help you?");
                    session.send("For immediate assistance with your concern, please contact us at at these numbers: 09159657715 or 09166387666");
                break;
            }
        break;

        default:
        session.send("Hey! Sorry, but I didn't quite understand what you said. In the mean time, you may contact us through the following:\n For event bookings & inquiries, text or Viber us: 09159657715 or 09166387666 \n E-mail: housemanilaph@gmail.com                                                                                                                                                  Table reservations: reservation@housemanila.com \n You can also type “Menu” to find out the other cool things I can do for you!");
        break;

    }
}

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

