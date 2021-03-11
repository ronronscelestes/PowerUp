var express = require("express");
var router = express.Router();
const GameModel = require("./../models/Game.model");
const UserModel = require("./../models/User.model");
const monPatch= require("./../controllers/monPatch") //Call of monPatch Controller, to use in the router.patch route

router.get("/", (req, res, next) => {
  res.redirect("/");
});

router.get("/search", async (req, res, next) => {
  try {
    if (!req.query.name ) {
      res.redirect('/')
    }
    const gamesFound = await GameModel.find({
      name: new RegExp(req.query.name, "i"),  // Creation of a regEx to make the search input non sensitive
    });
   
    gamesFound.sort((a, b) => b.metacritic - a.metacritic); //sort games by rates
   
    let data = {
      games: gamesFound,
      query: req.query.name,
      css: ["index", "card", "allGames"], //Passing the CSS files that matches the view we will render
      js: ["rating-color"],//Passing the Js files that matches the view we will render
    };

    res.render("games/gamesCateg", data);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/api", async (req, res, next) => { //creating an /api route to match the axios request, even though this route doesn't properly exist
  try {
    const gamesFound = await GameModel.find({name: new RegExp(req.query.name, "i")})// Creation of a regEx to make the search input non sensitive
      .sort({ metacritic: 1 }) // Sort games so that most popular games pop up first
      .limit(6);// Limit to 6 the number of games we want
    res.status(200).json(gamesFound);
  } catch (err) {
    console.log(err);
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    const game = await GameModel.findById(req.params.id);
    const gamesWithGenre= await GameModel.find({genres : game.genres})
    fourRandomGames = await GameModel.find({genres : game.genres}).skip(Math.random()*(gamesWithGenre.length-1)).limit(4)//getting 4 random games out of the list of games with same genre

    //Below, we are making sure that, when rendering the page, we know if one of the collection is ticked.
    let currentPlay = false;
    let wantToPlay = false;
    let alreadyPlayed = false;
    
    if(req.session.currentUser) {
      const user = await UserModel.findById(req.session.currentUser._id);
  
      user.currentPlay.forEach(currentPlayGame => {
        if(currentPlayGame.toString() === req.params.id.toString()) currentPlay = true;
      });
  
      user.wantToPlay.forEach(wantToPlayGame => {
        if(wantToPlayGame.toString() === req.params.id.toString()) wantToPlay = true;
      });
  
      user.alreadyPlayed.forEach(alreadyPlayedGame => {
        if(alreadyPlayedGame.toString() === req.params.id.toString()) alreadyPlayed = true;
      });
    }


    let data = {
      currentPlay,
      wantToPlay,
      alreadyPlayed,
      games:fourRandomGames,
      game: game,
      css: ["oneGame", "gameStatus", "card", "allGames"],
      js: ["rating-color", "addCollection"],
    };
    res.render("games/oneGame", data);
    
  } catch(err) {

  }
});

// router.get("/:id", (req, res, next) => {
//   GameModel.findById(req.params.id)
//     .then((game) => {
//       let data = {
//         game: game,
//         css: ["oneGame", "gameStatus"],
//         js: ["rating-color", "addCollection"],
//       };

//       res.render("games/oneGame", data);
//     })
//     .catch(next);
// });

// router.post('/:id', (req, res, next)=>{
//   let {currentPlay, alreadyPlayed,  wantToPlay}=req.body
//   if (!req.session.currentUser){
//     req.flash("login error", "Please login to add a game to your collection");
//     res.redirect(`/games/${req.params.id}`)
//   } else {
//     if (currentPlay!==undefined){
//       // currentPlay = req.params.id
//       UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull:{alreadyPlayed: req.params.id, wantToPlay : req.params.id }, $push:{currentPlay:req.params.id}}, {new:true} )
//       .then((dbresult)=>{
//         console.log(dbresult);
//         res.redirect('/profile')})
//     }
//     else if (alreadyPlayed !== undefined){
//       // alreadyPlayed = req.params.id
//       UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull: {currentPlay: req.params.id,  wantToPlay : req.params.id }, $push:{alreadyPlayed: req.params.id}  }, {new:true})
//       .then((dbresult)=>{
//               console.log(dbresult)

//               res.redirect('/profile')})
//             }
//     else if(wantToPlay!==undefined){
//       // wantToPlay = req.params.id
//       UserModel.findByIdAndUpdate(req.session.currentUser._id ,{$pull: {currentPlay: req.params.id,  alreadyPlayed : req.params.id } , $push: {wantToPlay: req.params.id} }, {new:true})
//       .then((dbresult)=>{
//         console.log(dbresult)
//         res.redirect('/profile')})
//     }
//   }
// })

// function monPatch(req, res, gameStatus, other1, other2) {
//   UserModel.findById(req.session.currentUser._id)
//         .then((user) => {
//           if (user[`${gameStatus}`].includes(req.params.id)) {

//             UserModel.findByIdAndUpdate(
//               req.session.currentUser._id,
//               { $pull: { [`${gameStatus}`]: req.params.id } },
//               { new: true }
//             )
//               .then((data) => {
//                 res.json(data);
//               })
//               .catch(err=>console.log(err));
//             } else {
//             console.log(user)
//             console.log(req.session.currentUser._id)
//             UserModel.findByIdAndUpdate(req.session.currentUser._id,{
//                 $pull: {
//                   [`${other1}`]: req.params.id,
//                   [`${other2}`]: req.params.id,
//                 },
//                 $push: { [`${gameStatus}`]: req.params.id },
//               },
//               { new: true }
//             )
//               .then((data) => {
//                 res.json(data);
//               })
//               .catch(err=>console.log(err));
//           }
//         })
//         .catch(err=>console.log(err));
// }

router.patch("/:id",  (req, res, next) => {
  console.log(req.session.currentUser);
  if (!req.session.currentUser) {
    req.flash("login error", "Please login to add a game to your collection");
    res.send("toto");
  } 
  else {
    if (req.query.name === 'currentPlay') {
      monPatch(req,res,  "currentPlay", "alreadyPlayed", "wantToPlay")//Using myPatch controller to make this function dryer
    } else if (req.query.name === 'alreadyPlayed') {
      monPatch(req, res, "alreadyPlayed", "wantToPlay", "currentPlay")
    } else if (req.query.name === 'wantToPlay' ) {
      monPatch(req, res, "wantToPlay", "currentPlay", "alreadyPlayed")
    }
  }
})


//BON ROUTER QUI VA AVEC AXIOS
// router.patch("/:id",  (req, res, next) => {
//   if (req.query.name === 'currentPlay') {
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         console.log('etape 1')
//         if (user.currentPlay.includes(req.params.id)) {
//           console.log('etape 2')

//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { currentPlay: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               console.log('etape 3')
//               res.json(data);
//             })
//             .catch(next);
//         } else {
//           console.log(user)
//           console.log(req.session.currentUser._id)
//           UserModel.findByIdAndUpdate(req.session.currentUser._id,{
//               $pull: {
//                 alreadyPlayed: req.params.id,
//                 wantToPlay: req.params.id,
//               },
//               $push: { currentPlay: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log('etape 3bis')
//               res.json(data);
//             })
//             .catch(err=>console.log(err));
//         }
//       })
//       .catch(next);
//   } else if (req.query.name === 'alreadyPlayed') {
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         if (user.alreadyPlayed.includes(req.params.id)) {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { alreadyPlayed: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               res.json(data);
//             })
//             .catch(next);
//         } else {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             {
//               $pull: { currentPlay: req.params.id, wantToPlay: req.params.id },
//               $push: { alreadyPlayed: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log(data)

//               res.json(data);
//             })
//             .catch(next);
//         }
//       })
//       .catch(next);

//   } else if (req.query.name === 'wantToPlay' ) {
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         console.log('etape 1')
//         if (user.wantToPlay.includes(req.params.id)) {
//           console.log('etape 2')
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { wantToPlay: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               console.log('etape 3')
//               res.json(data);
//             })
//             .catch(next);
//         } else {
//           console.log('etape 3')

//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             {
//               $pull: {
//                 currentPlay: req.params.id,
//                 alreadyPlayed: req.params.id,
//               },
//               $push: { wantToPlay: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log('etape 4')

//               console.log(data)

//               res.json(data);

//             })
//             .catch(next);
//         }
//       })
//       .catch(next);
//   }
// })



// router.post("/:id", (req, res, next) => {
//   let { currentPlay, alreadyPlayed, wantToPlay } = req.body;
//   if (currentPlay !== undefined) {
//     // currentPlay = req.params.id
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         if (user.currentPlay.includes(req.params.id)) {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { currentPlay: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               res.redirect("/profile");
//             })
//             .catch(next);
//         } else {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             {
//               $pull: {
//                 alreadyPlayed: req.params.id,
//                 wantToPlay: req.params.id,
//               },
//               $push: { currentPlay: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log(data);
//               res.redirect("/profile");
//             })
//             .catch(next);
//         }
//       })
//       .catch(next)

//   } else if (alreadyPlayed !== undefined) {
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         if (user.alreadyPlayed.includes(req.params.id)) {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { alreadyPlayed: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               res.redirect("/profile");
//             })
//             .catch(next);
//         } else {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             {
//               $pull: { currentPlay: req.params.id, wantToPlay: req.params.id },
//               $push: { alreadyPlayed: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log(data);
//               res.redirect("/profile");
//             })
//             .catch(next);
//         }
//       })
//       .catch(next)

//   } else if (wantToPlay !== undefined) {
//     UserModel.findById(req.session.currentUser._id)
//       .then((user) => {
//         if (user.wantToPlay.includes(req.params.id)) {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             { $pull: { wantToPlay: req.params.id } },
//             { new: true }
//           )
//             .then((data) => {
//               res.redirect("/profile");
//             })
//             .catch(next);
//         } else {
//           UserModel.findByIdAndUpdate(
//             req.session.currentUser._id,
//             {
//               $pull: {
//                 currentPlay: req.params.id,
//                 alreadyPlayed: req.params.id,
//               },
//               $push: { wantToPlay: req.params.id },
//             },
//             { new: true }
//           )
//             .then((data) => {
//               console.log(data);
//               res.redirect("/profile");
//             })
//             .catch(next);
//         }
//       })
//       .catch(next)
//   }
// });

module.exports = router;
