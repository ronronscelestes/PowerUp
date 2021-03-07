const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema ({
    name : String,
    slug : String,
    description : String,
    background_image : String,
    developers : [String],
    metacritic : String,
    genres : [String],
    platforms : [String],
    website : String,
    released : Number
  })

const GameModel = mongoose.model("games", gameSchema);
module.exports = GameModel;