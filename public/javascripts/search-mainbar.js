//---------ANCIENNE BARRE DE RECHERCHE ET RENVOIE VERS PAGES DE RESULTATS---------//


// inputSearchMainBar.addEventListener("keypress", function (evt) {
//   if (evt.key === "Enter") {
//     const search = inputSearchMainBar.value;
//     let query = `?name=${search}`;

//     axios
//       .get(`/games/search${query}`)
//       .then((dataRes) => {
//         window.location = `/games/search${query}`;
//         console.log(dataRes);
//       })
//       .catch((dataErr) => console.log(dataErr));
//   }
// });





//---------DROPDOWN---------//

const inputSearchMainBar = document.getElementById("main-search-bar");
const dropDown = document.getElementById("drop-down-searchbar");


function resetSearchResult() {
  dropDown.innerHTML = "";
}

function displaySearchResult(games) {
  resetSearchResult();

  if (games.length) {
    games.forEach((game) => {

    //prepare games genres HTML
    let genres = ""
    game.genres.forEach((genre, index) => {
        if(index < 3) genres += `<p>${genre}</p>`;
    });

    let li = document.createElement("li");

    li.innerHTML = `
      <a class="db-game-link" href="/games/${game._id}">
        <div class="db-game-left">
          <div class="dp-img-container" style="background-image: url('${game.background_image}');">
          </div>
          <div class="db-game-name">
              <p>${game.name}</p>
          </div>
        </div>
        <aside class="db-game-genres">
          ${genres}
        </aside>
      </a>
    `;

      li.addEventListener("click", ()=>{
          window.location = `/games/${game._id}`;
      });

      dropDown.appendChild(li);

    });

    const liAllResults = document.createElement("li");
    liAllResults.classList.add('link-all-results');
    liAllResults.innerHTML = `
      <p class="show-more-results">show more results</p>
    `;
    dropDown.appendChild(liAllResults);

    const inputSearch = document.getElementById("main-search-bar");
    const showMore = document.querySelector('.show-more-results');
    
    showMore.addEventListener('click', (evt) => {
      window.location = `/games/search?name=${inputSearch.value}`;
      inputSearch.value = "";
    })

  } else {
    let li = document.createElement("li");
    li.classList.add('no-match-found');
    li.innerHTML = `sorry, no match found`;
    dropDown.appendChild(li);
  }

}


function handleRead(evt, callback) {
    axios
    .get(`/games/api?name=${evt.target.value}`)
    .then((dataRes) => {
        // console.log(dataRes.data) 
        callback(dataRes.data)})
    .catch((apiError) => console.log(apiError));
}


//eventListener
inputSearchMainBar.onkeyup = (evt) => {
  if (evt.target.value.length < 3) resetSearchResult();
  else handleRead(evt, displaySearchResult);
};





//---------NOUVELLE BARRE DE RECHERCHE ET RENVOIE VERS PAGES DE RESULTATS---------//


import {searchBar} from '/javascripts/search-navbar.js'

searchBar(inputSearchMainBar, 'Enter', 'keypress')


//---------INPUT CONTAINER GRANDIT AU FOCUS---------//

const searchBarContainer = document.getElementById('main-search-container');

inputSearchMainBar.addEventListener('focus', () => {
  searchBarContainer.style.width = '100%';
})

inputSearchMainBar.addEventListener('blur', () => {
  searchBarContainer.style.width = '80%';
})


