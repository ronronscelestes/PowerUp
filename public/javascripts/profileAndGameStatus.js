const gamesContainer = document.getElementById('card-gallery');
const liAll = document.getElementById('all');
const liCurrentPlay = document.getElementById('currentPlay');
const liWantToPlay = document.getElementById('wantToPlay');
const liAlreadyPlayed = document.getElementById('alreadyPlayed');

let activeFilter = 'all';
let allGamesData = [];
let gamesToDisplay = [];
let userName;


const renderOneCat = gamesCat => {
  if(gamesCat.length !== 0) {
    gamesCat.forEach(game => {
      gamesContainer.innerHTML += `
      <div id="card-container" style="background-image: url('${game.background_image}');">
      <a href="/games/${game._id}">
      <div id="card-content">
          <div id="top-content">
              <div class="rating"><p>${game.metacritic}</p></div>
          </div>
          <div id="bottom-content">
              <h4 class="card-title">${game.name}</h4>
              ${game.genres.map(genre => `<p class="card-genre">${genre}</p>`)}
              <p class="card-platforms">
              </p>

          </div>
      </div>
      </a>
      `;
    })
  }
}

const renderGames = () => {
  gamesContainer.innerHTML = '';
  prepareGamesToDisplay();
  // console.log(gamesToDisplay);
  gamesToDisplay.forEach(category => {
    renderOneCat(category)
  })
}

const readAllGames = onDone => {
  axios.get('/profile/games')
  .then(apiRes => {
    // console.log(apiRes.data);

    // document.getElementById('username').innerText = apiRes.data.username;
    const {currentPlay, alreadyPlayed, wantToPlay, username} = apiRes.data;
    userName = username;
    allGamesData = [currentPlay, wantToPlay, alreadyPlayed];
    // console.log(allGamesData);

    onDone();
  })
  .catch(err => console.log(err));
}

const prepareGamesToDisplay = () => {
  console.log(activeFilter);
  //à partir de allGamesData et en fonction de activeFilter prépare gamesToDisplay
  //les jeux que je vais afficher
  switch(activeFilter) {
    case 'all' :
      gamesToDisplay = allGamesData;
      break;
    case 'currentPlay' : 
      gamesToDisplay = [allGamesData[0]];
      break;
    case 'wantToPlay' : 
      gamesToDisplay = [allGamesData[1]];
      break;
    case 'alreadyPlayed' :
      gamesToDisplay = [allGamesData[2]];
      break;
  }
  console.log(gamesToDisplay);
}

const onFilterBy = filter => {
  activeFilter = filter;
  renderGames();
}


readAllGames(() => {
  renderGames();
});

liAll.addEventListener('click', () => onFilterBy('all'));
liCurrentPlay.addEventListener('click', () => onFilterBy('currentPlay'));
liWantToPlay.addEventListener('click', () => onFilterBy('wantToPlay'));
liAlreadyPlayed.addEventListener('click', () => onFilterBy('alreadyPlayed'));





