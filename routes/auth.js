const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('./../models/User.model');

/* GET users listing. */
router.get('/signup', (req, res, next) => {
  let data = {
    css : ['auth']
  }
  res.render('auth/signup', data);
});

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

router.get('/signin', (req, res, next) => {
  let data = {
    css : ['auth']
  }
  res.render('auth/signin', data);
});

router.post('/signin', async (req, res, next) => {
  
});

module.exports = router;
