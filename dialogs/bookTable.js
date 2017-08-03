'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');
var specialrequest = [];
module.exports = [
    function(session, args, next){               
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
                    let eventDateConverted = new Date(eventDate);
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
                        .text(eventDateConverted.toDateString())
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
                session.send(consts.Prompts.BOOKING);
                // session.send(msg);
                builder.Prompts.choice(session, msg, selectArray, { maxRetries:0,promptAfterAction:false});
            });            
    },
    function(session, results, next){
        console.log(JSON.stringify(results.response));                                         
          session.userData.bookParty = results.response.entity;
          builder.Prompts.choice(session, consts.Prompts.CELEBRATE, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
          {listStyle: builder.ListStyle.button});                        
        //}
    // },    
    // function(session, results, next){  
    //     console.log(JSON.stringify(results.response) + "this is reults");
        
    //     if(results.response != undefined){
    //     session.userData.occasion = results.response.entity;
    //     builder.Prompts.choice(session, consts.Prompts.BIRTHDAY_REQUEST, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
    //     {listStyle: builder.ListStyle.button});

    //     } else {
        
    //     builder.Prompts.choice(session, consts.Prompts.WHAT_ELSE, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
    //     {listStyle: builder.ListStyle.button});
            
    //     }
        

    // },
    // function(session,results, next){  
        
    //     console.log(results.response.entity);      
        
    //     if (results.response.entity == 'Others'){  
    //         session.dialogData.select = results.response.entity;           
    //         builder.Prompts.text(session, consts.Prompts.ENTER_MESSAGE);
    //     }
    //      else{ 
    //     specialrequest.push(results.response.entity);             
    //     next();
    //     }
    // },

    // function(session, results, next){        
    //     if (session.dialogData.select == null){
        
    //     console.log(JSON.stringify(results) + "sa choice is that all");            
    //     builder.Prompts.choice(session, consts.Prompts.IS_THAT_ALL, "Add another|Yes, continue", 
    //     {listStyle: builder.ListStyle.button});
                
                
    //     }else{
    //     specialrequest.push(results.response);
    //         next();
    //     }
        

    // },

    // function(session,results, next){   
        
    //     if (session.dialogData.select == null){
    //     console.log(JSON.stringify(results) + `results ng
    //     add another`);
    //         if (results.response.entity == 'Add another'){
    //         session.userData.another = true;
    //         session.replaceDialog('/bookTable', "add"); 
    //         }else if (results.response.entity == 'Yes, continue'){            
    //         session.dialogData.reserve = results.response.entity;
    //         session.userData.special = specialrequest;
    //         next();
    //         }
    //     }else{
    //         next();
    //     }
    // },

    // function(session,results, next){  
    //     console.log(session.dialogData.reserve + "reserve at other");
    //     if (session.dialogData.reserve == null){            
    //     builder.Prompts.choice(session, consts.Messages.OTHERS_REQUEST, "Continue", 
    //     {listStyle: builder.ListStyle.button});
    //     }
    //     else{
    //         next();
    //     }

     },
     function(session, results){  
        session.userData.occasion = results.response.entity;
        console.log(session.dialogData.reserve + "reserve at r");      
        //session.userData.special = specialrequest;
        //builder.Prompts.text(session, consts.Prompts.TABLE_RESERVE);
        session.replaceDialog("/tablereserve");
        

    }

]