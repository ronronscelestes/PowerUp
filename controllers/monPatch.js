var express = require("express");
var router = express.Router();
const GameModel = require("./../models/Game.model");
const UserModel = require("./../models/User.model");

module.exports = function monPatch(req, res, gameStatus, other1, other2) {
  UserModel.findById(req.session.currentUser._id)
        .then((user) => {
          if (user[`${gameStatus}`].includes(req.params.id)) {

            UserModel.findByIdAndUpdate(
              req.session.currentUser._id,
              { $pull: { [`${gameStatus}`]: req.params.id } },
              { new: true }
            )
              .then((data) => {
                res.json(data);
              })
              .catch(err=>console.log(err));
            } else {
            console.log(user)
            console.log(req.session.currentUser._id)
            UserModel.findByIdAndUpdate(req.session.currentUser._id,{
                $pull: {
                  [`${other1}`]: req.params.id,
                  [`${other2}`]: req.params.id,
                },
                $push: { [`${gameStatus}`]: req.params.id },
              },
              { new: true }
            )
              .then((data) => {
                res.json(data);
              })
              .catch(err=>console.log(err));
          }
        })
        .catch(err=>console.log(err));
}