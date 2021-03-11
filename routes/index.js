var express = require('express');
var router = express.Router();
let GameModel= require('./../models/Game.model')
let UserModel= require('./../models/User.model')

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const gamesRpg = await GameModel.find({ genres: { $in: "RPG" } }).limit(100);
    const gamesSport= await GameModel.find({ genres: { $in: "Sports" } }).limit(100);
    const gamesArcade= await GameModel.find({ genres: { $in: "Arcade" } }).limit(100);

    function shuffleGamesAndPickFour(gamesArr) {
      const newArr = [];
      for (let i = gamesArr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = gamesArr[i];
        gamesArr[i] = gamesArr[j];
        gamesArr[j] = temp;
      }
      for (let i = 0; i < 4; i++) {
        newArr.push(gamesArr[i])
      }
      return newArr;
    }

    const shuffleRpgGames = shuffleGamesAndPickFour(gamesArcade);
    const shuffleSportsGames = shuffleGamesAndPickFour(gamesSport);
    const shuffleArcadeGames = shuffleGamesAndPickFour(gamesRpg);
    
    let data = {
      css: ['index', 'card', 'allGames'],
      js: ['search-mainbar'],
      isHomePage: true,
      rpgGames: shuffleRpgGames,
      sportGames: shuffleSportsGames,
      arcadeGames: shuffleArcadeGames,
    }
    res.render('index', data);
  } catch(err) {
    next(err)
  }

});





module.exports = router;
