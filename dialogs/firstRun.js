var builder = require('botbuilder');
module.exports = [
    function (session) {
var welcomeCard = new builder.HeroCard(session)
                                    .title('Valkyrie Messenger bot')
                                    .subtitle(`Wanna party tonight? Click Main Menu so I can help!`)
                                    .images([
                                        new builder.CardImage(session)
                                            .url("http://i.imgur.com/fJsZQY6.png")                                            
                                    ])
                                    .buttons([
                                        builder.CardAction.imBack(session, 'main-menu', 'Main Menu')
                                    ]);

                                session.send(new builder.Message(session)
                                    .addAttachment(welcomeCard));
    },
    function (session, results){
        if (results.response){
            var reply = results.response.entity;
            switch (reply){
                case 'main-menu':
                    session.replaceDialog('/mainmenu');
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
