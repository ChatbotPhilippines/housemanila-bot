'use strict'

var builder = require('botbuilder');
var consts = require('../helpers/consts');
var request = require('request');
module.exports = [

        function(session, args){
        session.dialogData.numbers = args || {};
        if (args && args.reprompt) {
              builder.Prompts.text(session, consts.Prompts.CONTACT_NUMBER_FORMAT);
        }else{        
        builder.Prompts.text(session, consts.Prompts.CONTACT_NUMBER_2);                    
        }
    },
    function(session,results){   
        console.log(results.response);
        session.dialogData.numbers.phone = results.response;
        var phonestring = session.dialogData.numbers.phone;
        var phonenumber = phonestring.toString();
        var matched = phonenumber.match(/\d+/g);
        var number = matched ? matched.join('') : '';
        if (number.length == 10 || number.length == 11 || number.length == 9) {                    

            builder.Prompts.choice(session, `${phonestring} ${consts.Prompts.CONFIRMATION}`, "Yes|No", {listStyle: builder.ListStyle.button}, {reprompt: false});

        }else{
             session.replaceDialog('/contactnumber', { reprompt: true });
        }
        
    },
    function(session, results){   
        session.userData.isVIP = false;
        console.log(results.response.entity);
        if(results.response.entity == "Yes"){
            session.userData.contact = session.dialogData.numbers.phone;
            session.endDialog(consts.Messages.CONFIRMATION_CODE, session.dialogData.numbers.phone);
            console.log(`${session.userData.occasion},
            ${session.userData.contact},
            ${session.userData.occasion},
            ${session.userData.isVIP},
            ${session.userData.name},
            ${session.userData.ppl},
            ${session.userData.special},
            `);
            //session.replaceDialog("/bookTable", session.dialogData.numbers.phone);
            var options = { method: 'POST',
            url: 'https://ms-gateway-api.herokuapp.com/api',
            qs: { MSpointname: 'tablebooking' },
            headers: 
            {               
                'content-type': 'application/json',
                'access-token': 'eyJhbGciOiJIUzI1NiJ9.c2FtcGxlVG9rZW4.F2vUteLfaWAK9iUKu1PRZnPS2r_HlhzU9NC8zeBN28Q' },
            body: 
            {   event_id: session.userData.bookParty,
                isvip: `${session.userData.isVIP}`,
                occasion: session.userData.occasion,
                special_requests: [session.userData.special],
                table_type: 'type1',
                no_ppl: session.userData.ppl,
                reservation_date: '2016-05-18T16:00:00',
                referral_name: session.userData.name,
                contact_number: session.userData.contact,
                status: 'pending',
                name_list: [ 'try' ],
                app_dtl: { app_name: 'house manila', app_code: '123' },
                client: "housemanila" },
            json: true };

            request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
            });

        }else if (results.response.entity == "No"){
            session.replaceDialog("/contactnumber");

        }

    }

]