console.log("table rates");
module.exports = [
    
    function (session) {        
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://i.imgur.com/dzy25OF.jpg"
            }]);
        session.endDialog(msg);
    }
]