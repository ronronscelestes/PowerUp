require("./../config/db.config");
const GameModel = require("./../models/Game.model");

function updateDB(oldValue, newValue, keyVal) {
    GameModel.updateMany(
        {[`${keyVal}`] : oldValue},
        { $addToSet: { [`${keyVal}`] : newValue } } )
        .then(game => {
            GameModel.updateMany(
                {[`${keyVal}`]: oldValue},
                { $pull: { [`${keyVal}`]: { $in: [ oldValue] } }},
            )
            .then(dbSucess => console.log(dbSucess))   
        })
        .catch(err => console.log(err, 'faaaaaail'))
}


// updateDB('BoardGames', 'Boardgames', 'genres')
