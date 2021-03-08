let express = require('express');
let router = express.Router();

/* GET profile page. */
// router.get('/', function(req, res, next) {
//   let data = {
//     css : ['profile']
//   }
//   res.render('profile/profile', data);
// let GameModel= require('./../models/Game.model')
// let UserModel= require('./../models/User.model')


//we need to pass css data
/* GET home page. */
router.get('/', (req, res, next)=> {
  UserModel.findById('60463007c32e21f0681ce165')
  .populate("currentPlay wantToPlay alreadyPlayed")
  .then((user)=>{
    console.log("user currentplay", user.currentPlay)
    console.log("user:", user)
    res.render('profile/profile', { user });
  })
  .catch(next)
});

// router.get("/", async (req, res, next) => {
//   let query = {};

//   if (req.query.name) {
//     const exp = new RegExp(req.query.name); // creating a regular expression
//     query.name = { $regex: exp };
//   }

//   try {
//     res.status(200).json(await UserModel.find(query));
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });


module.exports = router;

