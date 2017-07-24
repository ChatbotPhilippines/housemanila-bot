const builder = require('botbuilder');

module.exports =
(session, card, name) => {
   let item = [];
   /**loop thru card name*/
   name.forEach((names, index) => {
       /**loop thru cards and get card/s*/
       card.forEach((cards, index) => {
           /**filter card name/s*/
           if(cards.name == names){
               let button = [];
               /**loop thru buttons and get button/s*/
               cards.button.forEach((btn) => {
                   if('msg' in btn){button.push(builder.CardAction.imBack(session, btn.msg, btn.title));}
                   if('url' in btn){button.push(builder.CardAction.openUrl(session, btn.url, btn.title));}
               });

               item.push(new builder.HeroCard(session)
               .title(cards.title)
               .text(cards.text)
               .images([
                   builder.CardImage.create(session, cards.image)
               ])
               .buttons(button));
               button = [];
           }

       });
   });
   
   /**build card message*/
   let msg = new builder.Message(session)
   .attachmentLayout(consts.messageLayout.carousel)
   .attachments(item);
   
   return msg;
}