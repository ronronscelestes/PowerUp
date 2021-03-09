let express = require('express');
let router = express.Router();
let UserModel= require('./../models/User.model')


//we need to pass css data
/* GET home page. */
// router.get('/', (req, res, next)=> {
//   UserModel.findById('60463007c32e21f0681ce165')
//   .populate("currentPlay wantToPlay alreadyPlayed")
//   .then((user)=>{
//     // console.log("user currentplay", user.currentPlay)
    
//     // console.log("user:", user)
//     res.render('profile/profile', { user });
//   })
//   .catch(next)
// });

router.get('/', (req, res, next)=> {
  // res.send(req.session.currentUser._id);
  let data = {
    js : ['profileAndGameStatus'],
    css : ['card', 'allGames']
  }
  res.render('profile/profile', data);
});


router.get('/games', async(req, res, next)=>{
  // console.log(req.session.currentUser._id);

  try {
    if(req.session.currentUser._id) {
      const userData = await UserModel.findById(`${req.session.currentUser._id}`)
      .populate("currentPlay wantToPlay alreadyPlayed");

      let data = {
        currentPlay : userData.currentPlay,
        alreadyPlayed : userData.alreadyPlayed,
        wantToPlay : userData.wantToPlay,
        username : userData.username
      }

      res.json(data);
    } 
  } catch(err) {
    res.json('nope pas de jeux');
  }

});

module.exports = router;

