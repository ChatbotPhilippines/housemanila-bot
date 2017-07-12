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


//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.firstRun({ version: 1.0, dialogId: '*:/' }));
bot.use({
    botbuilder: function (session, next) {
        if (session.message.text === "GET_STARTED") {
            session.perUserInConversationData = {};
            session.userData = {};
            session.conversationData = {};
        }

        if (!session.userData.firstRun) {
            switch (session.message.address.channelId) {
                case 'facebook':
                    var params = {
                        setting_type: "call_to_actions",
                        thread_state: "new_thread",
                        call_to_actions: [{
                            payload: "GET_STARTED"
                        }]
                    };
                    request({
                        url: `https://graph.facebook.com/v2.6/me/thread_settings?access_token=${PAGE_ACCESS_TOKEN}`,
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        form: params
                    },

                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                session.userData.firstRun = true;

                                var welcomeCard = new builder.HeroCard(session)
                                    .title('Valkyrie Messenger bot')
                                    .subtitle(`Wanna party tonight? Click Main Menu so I can help!`)
                                    .images([
                                        new builder.CardImage(session)
                                            .url("http://i.imgur.com/fJsZQY6.png")                                      
                                    ])
                                    .buttons([
                                        builder.CardAction.dialogAction(session, "/", "", "Main Menu")
                                    ]);

                                session.send(new builder.Message(session)
                                    .addAttachment(welcomeCard));
                                
                                next();
                            } else {
                                session.userData.firstRun = true;
                                var welcomeCard = new builder.HeroCard(session)
                                    .title('Valkyrie Messenger bot')
                                    .subtitle(`Wanna party tonight? Click Main Menu so I can help!`)
                                    .images([
                                        new builder.CardImage(session)
                                            .url("http://i.imgur.com/fJsZQY6.png")                                            
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session, "menu", "Main Menu"),
                                    ]);

                                session.send(new builder.Message(session)
                                    .addAttachment(welcomeCard));
                                
                                next();
                            }
                        });
                    break;
                
               
            }

        } else {
            next();
        }
    }
});


//=======================================================
// Start of Conversation
//=======================================================



bot.dialog('/', firstRun);
bot.dialog('/guestlist', guestlist);
bot.dialog('/guestnames', names);
bot.dialog('/bookTable', bookTable);
