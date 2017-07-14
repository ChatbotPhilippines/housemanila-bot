'use strict'

var builder = require('botbuilder');
var consts = require('../helpers/consts');

module.exports = [

        function(session, args){
        session.send(consts.Messages.VIP_OFFER);
        var img = new builder.Message(session)
                        .addAttachment({
                            contentURL: 'http://i.imgur.com/fJsZQY6.png',
                            contentType: 'image/jpg',                            
                        });                    
                    session.send(img);
        builder.Prompts.choice(session, `Select: `, "Sure! Get me one|No thanks", 
        {listStyle: builder.ListStyle.button});
        

    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response.entity == "Sure! Get me one"){

            session.endDialog(consts.Messages.VIP_CONFIRMATION);

        }else if (results.response.entity == "No thanks"){
            session.replaceDialog("/contactnumber");
        }
        
    }    
]