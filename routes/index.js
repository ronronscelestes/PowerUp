var express = require('express');
var router = express.Router();
let GameModel= require('./../models/Game.model')
let UserModel= require('./../models/User.model')

/* GET home page. */
router.get('/', (req, res, next) => {
  let data = {
    css : ['index', 'card']
  }
  console.log(req.session.isLoggedIn);
  res.render('index', data);
});




/*Game Page*/
router.get('/game/:id', (req, res, next)=>{
GameModel.findById(req.params.id)
.then((game)=>{
  res.render('games/oneGame', {game})})
.catch(next)
})

router.post('/game/:id', (req, res, next)=>{
  let {currentPlay, alreadyPlayed,  wantToPlay}=req.body
  if (currentPlay!==undefined){
    // currentPlay = req.params.id
    UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$pull:{alreadyPlayed: req.params.id, wantToPlay : req.params.id }, $push:{currentPlay:req.params.id}}, {new:true} )
    .then((dbresult)=>{
      console.log(dbresult);  
      res.redirect('/profile')})
  } 
  else if (alreadyPlayed !== undefined){
    // alreadyPlayed = req.params.id
    UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$push:{alreadyPlayed: req.params.id},  $pull: { currentPlay: req.params.id,  wantToPlay : req.params.id } }, {new:true})
    .then((dbresult)=>{
            console.log(dbresult)

            res.redirect('/profile')})
          }
  else if(wantToPlay!==undefined){
    // wantToPlay = req.params.id
    UserModel.findByIdAndUpdate('60463007c32e21f0681ce165',{$push: {wantToPlay: req.params.id}, $pull: { currentPlay: req.params.id,  alreadyPlayed : req.params.id } }, {new:true})
    .then((dbresult)=>{
      console.log(dbresult)
      res.redirect('/profile')})
  }
})




module.exports = router;
