'use strict';

var builder = require('botbuilder');

module.exports = [
    function (err, msg, selectString) {
            if (err) {
                session.send(err);
                session.reset('/guest-list');
            } else {
                session.send("Which event would you like to get in the guest list for?");
                builder.Prompts.choice(session, msg, selectString, { maxRetries: 0 });
            }

        }

]