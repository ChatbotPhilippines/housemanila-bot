 'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');
var selectArray = [];
 module.exports = [
        
    function(session){        
        
            var options = { 
                method: 'GET',
                url: 'https://ms-gateway-api.herokuapp.com/api',
                headers: 
                {
                    'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q',
                    //'app-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.jWMtZaGkI2eb2hnk5DhazAXB-S8y6PIUHntngyuO-ow' 
                },
                params:{
                    App_details: {
                        appname: "House Manila", //client NBS,CITIBANK etc
                        apptype: "bot", //cms bot or another microservice
                    }   
                
                },
                qs:{
                        client: "housemanila",
                        MSpointname: "events", //user, session, aimodule, member, Basta microservice name                
                } 
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                
                var events =JSON.parse(body); 
                console.log((body));
                
                var elements = [];
                for(var i= 0; i < events.d.length; i++){
                    let eventName = events.d[i].event_name;
                    let eventVenue = events.d[i].event_venue;
                    let eventDate = events.d[i].event_date;
                    let eventImage = events.d[i].img;
                    let startTime = events.d[i].start_time;
                    let endTime = events.d[i].end_time;
                    let appId = events.d[i].app_id;
                    let eventId = events.d[i]._id;
                    let isSpecial = events.d[i].is_special;
                    
                    if(isSpecial == true){

                
                    var elem = [
                        new builder.HeroCard(session)
                        .title(eventName)
                        .images([
                            builder.CardImage.create(session, eventImage)
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, 'table-rates', 'Table Rates'),
                            builder.CardAction.imBack(session, 'floor-plan', 'Floor Plan'),
                            builder.CardAction.imBack(session, 'buy-tickets', 'Buy Tickets')

                        ])
                    ];
                    selectArray.push(eventId);
                    elements.push(...elem);  
                    }     
                }
                console.log(selectArray + "this is the select array");
                if(selectArray.length > 0){
                var msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(elements);

                // Show carousel
                session.send("Here are the upcoming events at House Manila");
                //session.send(msg);
                 builder.Prompts.choice(session, msg, selectArray, { maxRetries:0,promptAfterAction:false});    
                }else{                
        
                
                 session.send("There are no upcoming special events");
                }
                
            });            
    },
    function (session, results){
        if (results.response){
            console.log(JSON.stringify(results) + "This is the reply");
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
                    session.replaceDialog('/wit');
                    break;
            }
        }
        else{
            session.replaceDialog('/wit');
        }
    }
]