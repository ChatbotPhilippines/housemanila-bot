'use strict';

var builder = require('botbuilder');
var consts = require('../helpers/consts');
module.exports = [
    function(session){
    

        builder.Prompts.choice(session, consts.Prompts.CELEBRATE, "Birthday|Anniversary|Despedida|Bachelor/ette|Others|No Occasion", 
        {listStyle: builder.ListStyle.button});
        
    
    },
    function(session,results){   
        console.log(results.response.entity);
        if (results.response != null){
            session.replaceDialog('/birthday');             
        }
    }
]