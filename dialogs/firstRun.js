'use strict';

var builder = require('botbuilder');

module.exports = [

//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));
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
                                        builder.CardAction.imBack(session, "menu", "Main Menu"),
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
}),
 
    function(session){
        var selectArray = [
            "Guest-List",
            "Book-Table",
            "Events",
            "Corporate-Functions"
        ];

        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("What can I do for you?");
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('Guest List')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Guest-List', 'Guest List')
                ]),

                new builder.HeroCard(session)
                .title('Book a Table')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Book-Table', 'Book a Table')
                ]),

                new builder.HeroCard(session)
                .title('Events')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Events', 'See Upcoming Events')
                ]),

                new builder.HeroCard(session)
                .title('Corporate Functions')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Corporate-Functions', 'Book an Event')
                ])
            ]
        }
    },
    function (session, results){
        if (results.response){
            var reply = results.response.entity;
            switch (reply){
                case 'Guest-List':
                    session.replaceDialog('/guestlist');
                break;

                case 'Book-Table':
                    session.replaceDialog('/bookTable');
                break;

                case 'Events':
                    session.replaceDialog('/events');
                break;

                case 'Corporate-Functions':
                    session.replaceDialog('/corporateFunctions');
                break;

                default:
                    session.send('May error ka lol.');
            }
        }
        else{
            session.send('May error ka din lol.');
        }
    }
]