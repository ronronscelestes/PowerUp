const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    mail: String,
    password: String,
    wantToPlay: [{type: Schema.Types.ObjectId,  ref: "games"}],
    currentPlay: [{type: Schema.Types.ObjectId,  ref: "games"}],
    alreadyPlayed: [{type: Schema.Types.ObjectId,  ref: "games"}],
    playlist: [
        {name : String, 
        games : [
            {type: Schema.Types.ObjectId,  ref: "games"}
        ]},
    ]
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
