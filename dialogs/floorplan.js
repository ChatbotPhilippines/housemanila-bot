var builder = require('botbuilder');

module.exports = [

    function (session){
            session.send("Here's the floor plan for this event");
                    var imgfloor = new builder.Message(session)
                        .addAttachment({
                            contentURL: 'http://i.imgur.com/dzy25OF.jpg',
                            contentType: 'image/jpg',                            
                        });
                    session.send(imgfloor);
    }
]