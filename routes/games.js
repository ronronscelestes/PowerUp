var express = require('express');
var router = express.Router();
const GameModel = require('./../models/Game.model')


router.get('/', (req, res, next) => {
    res.render('index')
});

router.get('/search', async (req, res, next) => {
    try {
        console.log(req.query)
        console.log(req.query.name)
        const gamesFound = await GameModel.find( { name : new RegExp(req.query.name, 'i') } )
        res.render("games/gamesCateg", {gamesFound})
        
    } catch(err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;