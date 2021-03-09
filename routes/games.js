var express = require("express");
var router = express.Router();
const GameModel = require("./../models/Game.model");
const UserModel = require("./../models/User.model");

router.get("/", (req, res, next) => {
  res.redirect("/");
});

router.get("/search", async (req, res, next) => {
  try {
    const gamesFound = await GameModel.find({
      name: new RegExp(req.query.name, "i"),
    });

    let data = {
      games: gamesFound,
      css: ["index", "card", "allGames"],
      js: ["rating-color"],
    };
    res.render("games/gamesCateg", data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  GameModel.findById(req.params.id)
    .then((game) => {
      let data = {
        game: game,
        css: ["oneGame"],
      };

      res.render("games/oneGame", data);
    })
    .catch(next);
});

router.post('/:id', (req, res, next)=>{
  let {currentPlay, alreadyPlayed,  wantToPlay}=req.body
  if (currentPlay!==undefined){
    // currentPlay = req.params.id
    UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull:{alreadyPlayed: req.params.id, wantToPlay : req.params.id }, $push:{currentPlay:req.params.id}}, {new:true} )
    .then((dbresult)=>{
      console.log(dbresult);
      res.redirect('/profile')})
  }
  else if (alreadyPlayed !== undefined){
    // alreadyPlayed = req.params.id
    UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull: {currentPlay: req.params.id,  wantToPlay : req.params.id }, $push:{alreadyPlayed: req.params.id}  }, {new:true})
    .then((dbresult)=>{
            console.log(dbresult)

            res.redirect('/profile')})
          }
  else if(wantToPlay!==undefined){
    // wantToPlay = req.params.id
    UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull: {currentPlay: req.params.id,  alreadyPlayed : req.params.id } , $push: {wantToPlay: req.params.id} }, {new:true})
    .then((dbresult)=>{
      console.log(dbresult)
      res.redirect('/profile')})
  }
})


module.exports = router;
