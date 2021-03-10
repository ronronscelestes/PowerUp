require('dotenv').config();
require("./../config/db.config"); // fetch the db connection
const axios = require("axios"); 

const GameModel = require("./../models/Game.model");

let gamesData = [];

const scrapGames = async (page, onDone) => {

  try {
    
    const apiRes = await axios.get(`https://api.rawg.io/api/games?page=${page}&key=${process.env.API_KEY}`);
    
    //to check if this all data of this page is pushed in gamesData
    let nbDone = 0;

    apiRes.data.results.forEach(async (result, index) => {
      const game = await axios.get(`https://api.rawg.io/api/games/${result.id}?key=${process.env.API_KEY}`)

      const { name, slug, description, background_image, metacritic, website, released, developers, genres, platforms } = game.data;

      gamesData.push({
        name : name,
        slug : slug,
        description : description,
        background_image : background_image,
        metacritic : metacritic,
        website : website,
        released: Number(released.split('-')[0]),
        developers: developers.map( ({name}) => name ),
        genres: genres.map( ({name}) => name ),
        platforms: platforms.map( item => item.platform.name ),
      });

      nbDone++;
      if (nbDone === apiRes.data.results.length && onDone) onDone();

    });

  } catch(err) {
    console.log(err);
  }
  
};

//to check if all loops are done before inserting data in db
let loopDone = 0;
const nbToDo = 600;


for(let i = 1; i <= nbToDo; i++) {
  scrapGames(i, () => {
    loopDone++;
    console.log(loopDone);
    if(loopDone === nbToDo) {
      GameModel.insertMany(gamesData)
      .then(dbSuccess => console.log(dbSuccess, "WELL INSERTED"))
      .catch(err => console.log(err, "FAIL"));
    };
  });
}
