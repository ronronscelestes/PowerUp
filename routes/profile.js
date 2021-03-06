let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
let UserModel= require('./../models/User.model')
const protectPrivateRoute = require('./../middlewares/protectPrivateRoute')//protecting every route of the profile path


router.get('/', protectPrivateRoute, (req, res, next)=> {
  let data = {
    js : ['profileAndGameStatus'],
    css : ['fonts', 'card', 'profile']
  }
  res.render('profile/profile', data);
});


router.get('/games', protectPrivateRoute, async(req, res, next)=>{

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

router.get('/settings', protectPrivateRoute, async (req, res) => {
  const user= await UserModel.findById(req.session.currentUser._id)
  let data = {
    user : user,
    css : ['settings']
  }
  res.render('profile/settings', data)
})



router.get('/update', protectPrivateRoute, async(req, res, next)=>{
  try {
    const userInfo= await UserModel.findById(req.session.currentUser._id)
    let data = {
      css : ['auth'],
      user : userInfo
    }
    
    res.render('profile/update', data)
  } catch(err) {
    next(err);
  }

})

router.post('/update', protectPrivateRoute, (req, res, next)=>{
  const {mail, username}=req.body
  UserModel.findByIdAndUpdate(req.session.currentUser._id, {mail, username}, {new:true})
  .then((user)=> {
    res.redirect('/profile')})
  .catch(next)
})

router.get('/update-password', protectPrivateRoute, (req, res, next)=>{
  let data = {
  css : ['auth'],
}
  res.render('profile/updatePassword', data)}
)

router.post('/update-password', protectPrivateRoute, async(req, res, next)=>{
  let {formerPassword, newPassword}=req.body
  const User= await UserModel.findById(req.session.currentUser._id)
  const isSamePassword = bcrypt.compareSync(formerPassword, User.password);
      if (!isSamePassword) {
        req.flash("error", "Your former password is not valid.");
        res.redirect('/profile/update-password');
      } 
      else {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        newPassword = hashedPassword;
        await UserModel.findByIdAndUpdate(req.session.currentUser._id, {password : newPassword}, {new:true});
        res.redirect('/profile')
      }
  }
)

router.get("/delete", protectPrivateRoute, async (req, res, next) => {
  try {
    await UserModel.findByIdAndRemove(req.session.currentUser._id);
    req.session.destroy(err => {// We have to destroy the session here, otherwise we are not signed out.
      res.redirect("/auth/signup");
    });
    
  } catch (err) {
    next(err);
  }
});



module.exports = router;

