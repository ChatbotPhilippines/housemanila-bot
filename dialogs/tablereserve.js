'use strict'

var builder = require('botbuilder');

module.exports = [

        function(session){        
        builder.Prompts.text(session, 'Under whose name will the table be reserved? \n Please enter full name:');
        

    },
    function(session, results){   
        console.log(results.response.entity);
        if (results.response != null){
            builder.Prompts.choice(session, `How many persons are in the group?`, "4-6|7-10|11-15|16+", 
        {listStyle: builder.ListStyle.button});

        }
    },
    function(session, results){   

        if (results.response.entity != "16+"){
        
        session.replaceDialog("/seven-fifteen");

        }else if (results.response.entity == "16+"){

        session.replaceDialog("/sixteen");

        }

    }

]