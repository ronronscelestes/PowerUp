const gamesContainer = document.getElementById('card-gallery');
const liAll = document.getElementById('all');
const liCurrentPlay = document.getElementById('currentPlay');
const liWantToPlay = document.getElementById('wantToPlay');
const liAlreadyPlayed = document.getElementById('alreadyPlayed');
const allLis = [liAll, liCurrentPlay, liWantToPlay, liAlreadyPlayed];

// ${game.genres.map(genre => `<span class="tag-genre">${genre}</span>`)}

let activeFilter = 'all';
let allGamesData = [];
let gamesToDisplay = [];
let userName;
let genres;
let platforms;

const renderOneCat = gamesCat => {
  if(gamesCat.length !== 0) {
    gamesCat.forEach(game => {

      genres = game.genres.map(genre => `<span class="tag-genre">${genre}</span>`).join("");
      platforms = game.platforms.map(platform => `<span class="split-dash"> ${platform} </span>`).join("");

      gamesContainer.innerHTML += `
      <div id="card-container" style="background-image: url('${game.background_image}');">
      <a href="/games/${game._id}">
      <div id="card-content">
          <div id="top-content">
            <div class="rating"><p>${game.metacritic ? game.metacritic : `N/A`}</p></div>
          </div>
          <div id="bottom-content">
            <h4 class="card-title">${game.name}</h4>
            <p class="card-genres">
            ${genres}
            </p>
            <p class="card-platforms">
            ${platforms}
            </p>
          </div>
      </div>
      </a>
      `;
    })
  }
}

const renderGames = () => {
  document.getElementById('username').innerText = userName;
  gamesContainer.innerHTML = '';
  prepareGamesToDisplay();
  gamesToDisplay.forEach(category => {
    renderOneCat(category)
  })
}

const readAllGames = onDone => {
  axios.get('/profile/games')
  .then(apiRes => {

    const {currentPlay, alreadyPlayed, wantToPlay, username} = apiRes.data;
    userName = username;
    allGamesData = [currentPlay, wantToPlay, alreadyPlayed];

    onDone();
  })
  .catch(err => console.log(err));
}

const prepareGamesToDisplay = () => {
  allLis.forEach(li => {
    li.classList.remove('bigger-font-li');
  })
  //à partir de allGamesData et en fonction de activeFilter prépare gamesToDisplay
  //les jeux que je vais afficher
  switch(activeFilter) {
    case 'all' :
      liAll.classList.add('bigger-font-li');
      gamesToDisplay = allGamesData;
      break;
    case 'currentPlay' : 
      liCurrentPlay.classList.add('bigger-font-li');
      gamesToDisplay = [allGamesData[0]];
      break;
    case 'wantToPlay' : 
      liWantToPlay.classList.add('bigger-font-li');
      gamesToDisplay = [allGamesData[1]];
      break;
    case 'alreadyPlayed' :
      liAlreadyPlayed.classList.add('bigger-font-li');
      gamesToDisplay = [allGamesData[2]];
      break;
  }
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





