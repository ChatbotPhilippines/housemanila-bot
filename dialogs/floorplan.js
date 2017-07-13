var builder = require('botbuilder');

module.exports = [

    function (session){
            session.send("Here's the floor plan for this event");
                    var imgfloor = new builder.Message(session)
                        .addAttachment({
                            contentURL: 'http://i.imgur.com/fJsZQY6.png',
                            contentType: 'image/jpg',                            
                        });                    
                    session.endDialog(imgfloor);
            }
]