'use strict';

var builder = require('botbuilder');


module.exports = [
    function(session, args){
        session.dialogData.party = args || {};
        var selectArray = [
            "DROP",
            "RSVP",
            "Organized Chaos",
            "We Own The Night"
        ];

        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("Which event would you like to get in the guest list for?");
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('DROP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'DROP', 'DROP')
                ]),

                new builder.HeroCard(session)
                .title('RSVP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'RSVP', 'RSVP')
                ]),

                new builder.HeroCard(session)
                .title('Organized Chaos')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Organized', 'Organized Chaos')
                ]),

                new builder.HeroCard(session)
                .title('We Own The Night')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'WOTN', 'We Own The Night')
                ])
            ]
        }
    },
    function (session, results){
        session.dialogData.party = results.response.entity;
        session.replaceDialog('/guestnames', session.userData.names);
    },
    function(session, results){
        session.userData.names = results.response;
        console.log("Napunta sa huling waterfall");
        console.log(session.dialogData.party);
        console.log(session.userData.names);
        // var msg = ;
        var party = session.dialogData.party;
        var names = session.userData.names;
        builder.Prompts.choice(session, `You will be enlisted to the ${session.dialogData.guestlist.party} with the following people %(guests)s. Is this confirmed?`, session.userData.names, "Yes|No", {listStyle: builder.ListStyle.button});
     },
     function(session, results){
        if(results.response === 'Yes'){
            session.send("You are now pending for approval in our guest list! You will receive a message once you get approved. Thank you!");
            session.endDialog();
        }
        // else{
        //     session.replaceDialog
        // }
     }
]