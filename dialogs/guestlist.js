'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require("request");

module.exports = [
    function(session, args){
        var selectArray = [];
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
                    let eventCode = events.d[i].event_code;

                
                    var elem = [
                        new builder.HeroCard(session)
                        .title(eventName)
                        .images([
                            builder.CardImage.create(session, eventImage)
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, eventId, eventName)
                        ])
                    ];
                    selectArray.push(eventId);
                    elements.push(...elem);       
                }
        
                var msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments(elements);

                // Show carousel
                session.send(consts.Prompts.EVENT);
                // session.send(msg);
                builder.Prompts.choice(session, msg, selectArray, { maxRetries:0,promptAfterAction:false});
            });
    },
    function (session, results){
        session.userData.party = results.response.entity;
        session.replaceDialog('/guestnames');
    }
]