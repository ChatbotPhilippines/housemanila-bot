'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session, args){
        session.send('May we offer you a table from our elevated VIP area? These tables go from P10-30K and are fully consummable! 🍾🍾🍾');
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

            session.endDialog("For immediate assistance with your table reservation, you may contact us at 09272204244 🙂");

        }else if (results.response.entity == "No thanks"){
            session.replaceDialog("/contactnumber");
        }
        
    }    
]