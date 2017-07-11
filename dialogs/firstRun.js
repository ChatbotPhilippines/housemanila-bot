'use strict';

var builder = require('botbuilder');

module.exports = [
    function(session){
        var selectArray = [
            "Guest-List",
            "Book-Table",
            "Events",
            "Corporate-Functions"
        ];

        var cards = getCards();
    }
]