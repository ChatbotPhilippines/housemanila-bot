'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = [];
module.exports = [
    function(session, args, next){
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
        session.send(consts.Prompts.EVENT);
        builder.Prompts.choice(session, reply, selectArray, { maxRetries:0,promptAfterAction:false});

        function getCards(session){
            return [
                new builder.HeroCard(session)
                .title('DROP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/G1Ovu1I.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'DROP', 'DROP')
                ]),

                new builder.HeroCard(session)
                .title('RSVP')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/usQas1O.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'RSVP', 'RSVP')
                ]),

                new builder.HeroCard(session)
                .title('Organized Chaos')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/DLhhycD.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'Organized', 'Organized Chaos')
                ]),

                new builder.HeroCard(session)
                .title('We Own The Night')
                .images([
                    builder.CardImage.create(session, 'http://i.imgur.com/QCAFdT6.jpg')
                ])
                .buttons([
                    builder.CardAction.imBack(session, 'WOTN', 'We Own The Night')
                ])
            ]
        }
    },
    function(session, args, next){
        session.userData.bookParty = results.response.entity;
        console.log(results.response.entity);
        if (args != "add"){
            builder.Prompts.choice(session, consts.Prompts.CELEBRATE, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
            {listStyle: builder.ListStyle.button});        
        }else{
            next();
        }
    },    
    function(session, results, next){  
        console.log(JSON.stringify(results.response) + "this is reults");
        
        if(results.response != undefined){
        session.userData.occasion = results.response.entity;
        builder.Prompts.choice(session, consts.Prompts.BIRTHDAY_REQUEST, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
        {listStyle: builder.ListStyle.button});

    } else {
        
        builder.Prompts.choice(session, consts.Prompts.WHAT_ELSE, "Balloons|Party Poppers|Sparklers|Cake|Bottle Parade|Others|None", 
        {listStyle: builder.ListStyle.button});
            
        }
        

    },
    function(session,results, next){  
        
        console.log(results.response.entity);      
        
        if (results.response.entity == 'Others'){  
            session.dialogData.select = results.response.entity;           
            builder.Prompts.text(session, consts.Prompts.ENTER_MESSAGE);
        }
         else{ 
        request.push(results.response.entity);             
        next();
        }
    },

    function(session, results, next){        
        if (session.dialogData.select == null){
        
        console.log(JSON.stringify(results) + "sa choice is that all");            
        builder.Prompts.choice(session, consts.Prompts.IS_THAT_ALL, "Add another|Yes, continue", 
        {listStyle: builder.ListStyle.button});
                
                
        }else{
        request.push(results.response);
            next();
        }
        

    },

    function(session,results, next){   
        
        if (session.dialogData.select == null){
        console.log(JSON.stringify(results) + `results ng
        add another`);
            if (results.response.entity == 'Add another'){
            session.replaceDialog('/bookTable', "add"); 
            }else if (results.response.entity == 'Yes, continue'){            
            session.dialogData.reserve = results.response.entity;
            session.userData.special = request;
            next();
            }
        }else{
            next();
        }
    },

    function(session,results, next){  
        console.log(session.dialogData.reserve + "reserve at other");
        if (session.dialogData.reserve == null){            
        builder.Prompts.choice(session, consts.Messages.OTHERS_REQUEST, "Continue", 
        {listStyle: builder.ListStyle.button});
    }
    else{
        next();
    }

    },
     function(session, results){  
        console.log(session.dialogData.reserve + "reserve at r");      
        session.userData.special = request;
        //builder.Prompts.text(session, consts.Prompts.TABLE_RESERVE);
        session.replaceDialog("/tablereserve");
        

    }

]