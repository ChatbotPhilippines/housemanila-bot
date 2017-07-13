'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
    

        builder.Prompts.choice(session, `Are you celebrating anything special? 🙂`, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});
        
    
    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response != null){
            session.replaceDialog('/birthday');             
        }
    }
]