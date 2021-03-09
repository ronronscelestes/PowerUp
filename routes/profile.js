let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
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



router.get('/update', async(req, res, next)=>{
  const userInfo= await UserModel.findById(req.session.currentUser._id)
  let data = {
    css : ['update'],
    user : userInfo
  }
  
res.render('profile/update', data)

})

router.post('/update', (req, res, next)=>{
  const {mail, username}=req.body
  UserModel.findByIdAndUpdate(req.session.currentUser._id, {mail, username}, {new:true})
  .then((user)=> {
    console.log(user)
    res.redirect('/profile')})
  .catch(next)
})

router.get('/update-password', (req, res, next)=>{
  let data = {
  css : ['updatePassword'],
}
  res.render('profile/updatePassword', data)}
)

router.post('/update-password', async(req, res, next)=>{
  let {formerPassword, newPassword}=req.body
  const User= await UserModel.findById(req.session.currentUser._id)
  const isSamePassword = bcrypt.compareSync(formerPassword, User.password);
      if (!isSamePassword) {
        console.log('prévoir un message d erreur')
        res.redirect("/update-password");
      } 
      else {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        newPassword = hashedPassword;
        await UserModel.findByIdAndUpdate(req.session.currentUser._id, {password : newPassword}, {new:true});
        res.redirect('/profile')
      }
  }
)


router.get("/delete", async (req, res, next) => {
  try {
    await UserModel.findByIdAndRemove(req.session.currentUser._id);
    res.redirect("/auth/signup");
  } catch (err) {
    next(err);
  }
});



module.exports = router;

