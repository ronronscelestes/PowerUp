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
    // console.log(req.session.isLoggedIn);
    res.render('index', data);
  } catch(err) {
    next(err)
  }

});




/*Game Page*/
// router.get('/game/:id', (req, res, next)=>{
// GameModel.findById(req.params.id)
// .then((game)=>{
//   res.render('games/oneGame', {game})})
// .catch(next)
// })


// router.get('/game/:id', (req, res, next)=>{
//   GameModel.findById(req.params.id)
//   .then((game)=>{

//     let data = {
//       game : game,
//       css : ['oneGame']
//     }

//     res.render('games/oneGame', data)
  
//   })
//   .catch(next)
// })

// router.post('/game/:id', (req, res, next)=>{
//   let {currentPlay, alreadyPlayed,  wantToPlay}=req.body
//   if (currentPlay!==undefined){
//     // currentPlay = req.params.id
//     UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$pull:{alreadyPlayed: req.params.id, wantToPlay : req.params.id }, $push:{currentPlay:req.params.id}}, {new:true} )
//     .then((dbresult)=>{
//       console.log(dbresult);  
//       res.redirect('/profile')})
//   } 
//   else if (alreadyPlayed !== undefined){
//     // alreadyPlayed = req.params.id
//     UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$push:{alreadyPlayed: req.params.id},  $pull: { currentPlay: req.params.id,  wantToPlay : req.params.id } }, {new:true})
//     .then((dbresult)=>{
//             console.log(dbresult)

//             res.redirect('/profile')})
//           }
//   else if(wantToPlay!==undefined){
//     // wantToPlay = req.params.id
//     UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$push: {wantToPlay: req.params.id}, $pull: { currentPlay: req.params.id,  alreadyPlayed : req.params.id } }, {new:true})
//     .then((dbresult)=>{
//       console.log(dbresult)
//       res.redirect('/profile')})
//   }
// })




module.exports = router;
