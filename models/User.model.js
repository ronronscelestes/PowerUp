const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    mail: String,
    password: String,
    want_to_play: [{type: Schema.Types.ObjectId,  ref: "games"}],
    current_play: [{type: Schema.Types.ObjectId,  ref: "games"}],
    already_played: [{type: Schema.Types.ObjectId,  ref: "games"}],
    playlist: [{type: Schema.Types.ObjectId,  ref: "games"}]
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;