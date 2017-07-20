 'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request')

 module.exports = [
        
    function(session){
        // var selectArray = [
        //     "table-rates",
        //     "floor-plan",
        //     "buy-tickets"
        // ];

        var cards = getCards();
        console.log(cards);
        var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards);
        session.send("Here are the upcoming events at House Manila");
        builder.Prompts.choice(session, reply, { maxRetries:0,promptAfterAction:false});

        
        

        function getCards(session){
                var options = { 
                method: 'GET',
                url: 'http://7d2fa0f4.ngrok.io/api/events',
                headers: 
                {
                    'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q' 
                } 
            };

                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                
                var events =JSON.parse(body); 
                console.log(JSON.parse(body));
                
                var elements = [];
                for(var i= 0; i < events.d.length; i++){
                let eventName = events.d[i].event_name;
                let eventVenue = events.d[i].event_venue;
                let eventDate = events.d[i].event_date;
                let eventImage = events.d[i].event_image;
                let startTime = events.d[i].start_time;
                let endTime = events.d[i].end_time;
                let appId = events.d[i].app_id;
                let eventId = events.d[i]._id;

                
                let elem = [
                new builder.HeroCard(session)
                .title(eventName)
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
                    builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
                    builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')

                ])
            ]
            elements.push(elem);
            return elements
                
                //returnend
            }
        });


            // return [
            //     new builder.HeroCard(session)
            //     .title('Sample 1')
            //     .images([
            //         builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
            //     ])
            //     .buttons([
            //         builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
            //         builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
            //         builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')

            //     ])

                // new builder.HeroCard(session)
                // .title('Sample 2')
                // .images([
                //     builder.CardImage.create(session, 'http://i.imgur.com/fJsZQY6.png')
                // ])
                // .buttons([
                //     builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
                //     builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
                //     builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')
                // ]),                
  //          ]
        }
    },
    function (session, results){
        if (results.response){
            console.log(JSON.stringify(results.response) + "This is the reply");
            var reply = results.response.entity;
            switch (reply){
                case 'table-rates':                                
                    session.replaceDialog('/tablerates'); 
                 
                break;

                case 'floor-plan':                
                    session.replaceDialog('/floorplan'); 

                break;

                case 'buy-tickets':
                    session.send(consts.Messages.BUY_TICKETS);
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