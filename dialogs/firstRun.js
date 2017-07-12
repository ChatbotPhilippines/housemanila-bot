var builder = require('botbuilder');
module.exports = [
    function (session) {
var welcomeCard = new builder.HeroCard(session)
                                    .title('Valkyrie Messenger bot')
                                    .subtitle(`Wanna party tonight? Click Main Menu so I can help!`)
                                    .images([
                                        new builder.CardImage(session)
                                            .url(`${Constants.BASE_URL}/assets/logo.jpg`)
                                            .alt('Logo')
                                    ])
                                    .buttons([
                                        builder.CardAction.dialogAction(session, "/menu", " ", "Main Menu"),
                                    ]);

                                session.send(new builder.Message(session)
                                    .addAttachment(welcomeCard));
    }
]
