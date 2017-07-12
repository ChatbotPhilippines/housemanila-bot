 'use strict';

var builder = require('botbuilder');

 module.exports = [
        
    function(session){
        var selectArray = [
            "table-rates",
            "floor-plan",
            "buy-tickets"
        ];

        var cards = getCards();
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("Here are the upcoming events at House Manila");
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('Sample 1')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
                    builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
                    builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')

                ]),

                new builder.HeroCard(session)
                .title('Sample 2')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
                    builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
                    builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')
                ]),                
            ]
        }
    },
    function (session, results){
        if (results.response){
            console.log(JSON.stringify(results.response) + "This is the reply");
            var reply = results.response.entity;
            switch (reply){
                case 'table-rates':                    
                    // var img = new builder.Message(session)
                    //     .addAttachment({
                    //         contentURL: 'http://i.imgur.com/dzy25OF.jpg',
                    //         contentType: 'image/jpg',
                    //         name: 'table rates'
                    //     });
                    // session.send(img);      
                    session.replaceDialog('/tablerates'); 
                 
                break;

                case 'floor-plan':
                    // session.send("Here's the floor plan for this event");
                    // var imgfloor = new builder.Message(session)
                    //     .addAttachment({
                    //         contentURL: 'http://i.imgur.com/dzy25OF.jpg',
                    //         contentType: 'image/jpg',
                    //         name: 'NBS Logo'
                    //     });
                    // session.send(imgfloor);

                    session.replaceDialog('/floorplan'); 

                break;

                case 'buy-tickets':
                    session.send('For tickets or table reservations, you may contact +639272204244 🙂');
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