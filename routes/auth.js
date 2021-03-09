const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('./../models/User.model');

//GET SIGNUP
router.get('/signup', (req, res, next) => {
  let data = {
    css : ['auth']
  }
  res.render('auth/signup', data);
});

//POST SIGNUP
router.post('/signup', async (req, res, next) => {
  try {
    const newUser = { ...req.body }
    const userFound = await UserModel.findOne({mail : newUser.mail});

    if (userFound) {
        res.redirect("/auth/signin");
    } else {
        const hashedPassword = bcrypt.hashSync(newUser.password, 10);
        newUser.password = hashedPassword;
        await UserModel.create(newUser);

        res.redirect("/auth/signin");
    }
  } catch(err) {
    console.log('ERROR');
    console.log(err);
  }
});

//GET SIGNIN
router.get('/signin', (req, res, next) => {
  let data = {
    css : ['auth']
  }
  res.render('auth/signin', data);
});

//POST SIGNIN
router.post('/signin', async (req, res, next) => {
  try {
    const {mail, password} = req.body;
    const foundUser = await UserModel.findOne({mail: mail});

    if (!foundUser) {
      res.redirect("/auth/signin");
    } else {
        const isSamePassword = bcrypt.compareSync(password, foundUser.password);
        
        if (!isSamePassword) {
          res.redirect("/auth/signin");
        } 
        else {
          const userObject = foundUser.toObject();
          delete userObject.password;
          req.session.currentUser = userObject;
          res.redirect("/");
        }
    }
  } catch(err) {
    console.log(err);
  }
});

//GET SIGNOUT
router.get('/signout', (req, res, next) => {
  req.session.destroy(err => {
    res.redirect("/");
  });
});

module.exports = router;
