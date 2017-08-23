// // const builder = require('botbuilder');

// // module.exports =
// // (session, card, name) => {
// //    let item = [];
// //    /**loop thru card name*/
// //    name.forEach((names, index) => {
// //        /**loop thru cards and get card/s*/
// //        card.forEach((cards, index) => {
// //            /**filter card name/s*/
// //            if(cards.name == names){
// //                let button = [];
// //                /**loop thru buttons and get button/s*/
// //                cards.button.forEach((btn) => {
// //                    if('msg' in btn){button.push(builder.CardAction.imBack(session, btn.msg, btn.title));}
// //                    if('url' in btn){button.push(builder.CardAction.openUrl(session, btn.url, btn.title));}
// //                });

// //                item.push(new builder.HeroCard(session)
// //                .title(cards.title)
// //                .text(cards.text)
// //                .images([
// //                    builder.CardImage.create(session, cards.image)
// //                ])
// //                .buttons(button));
// //                button = [];
// //            }

// //        });
// //    });
   
// //    /**build card message*/
// //    let msg = new builder.Message(session)
// //    .attachmentLayout(consts.messageLayout.carousel)
// //    .attachments(item);
   
// //    return msg;
// // }

// var date = new Date();

// var n = date.toDateString();

// console.log(date);
// console.log(n);
// var targetTime = new Date();
// var diff = -8.00;
// var timeZoneDiff = diff * 60 + targetTime.getTimezoneOffset();
// var kobe = new Date(targetTime.getTime()+ timeZoneDiff * 60 * 1000);

// console.log(kobe);

// let availableAreas = ['Makati', 'Taguig', 
// 							  'Pasig', 'Manila',
// 							  'Mandaluyong', 'Quezon City',
// 							  'Marikina', 'Antipolo',
// 							  'Rizal', 'Paranaque',
//                               'Alabang', 'Las Pinas'];
// let place = "aaa"
// if(availableAreas.indexOf(place) > -1){
//     console.log("Nasa loob siya ng array");
// }
// else{
//     console.log("Wala siya sa array");
// }

// var moment = require('moment');

// console.log('Test for Moment');
// var today = moment();
// var event_date = moment("2017-08-13", "YYYY-MM-DD");
// console.log(today);
// console.log(event_date);

// if(event_date.isAfter(today)){
// 	// event_date.add(7, 'days')
// 	// console.log('New event date is: ' + event_date.format());
// 	event_date = moment(event_date).add(7, 'd').format("YYYY-MM-DDTHH:mm:ss:sss");
// 	console.log("New date is: " + event_date);
// }
// else{
// 	console.log('Nothing happened');
// }

var ans = "10" + 20 + 30;

console.log(ans);