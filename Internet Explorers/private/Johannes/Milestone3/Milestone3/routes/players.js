var express = require('express');
var router = express.Router();
var pl = require('../data/players.json');

/* GET players page. */
router.get('/', function(req, res, next) {
    res.render('players', {
        title: 'Players',
        playersJason:pl
    });
});

module.exports = router;
