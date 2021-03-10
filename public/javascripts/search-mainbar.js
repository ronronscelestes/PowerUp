const inputSearchMainBar = document.getElementById("main-search-bar");
const dropDown = document.getElementById("drop-down");
const results = dropDown.querySelectorAll(".result")



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


function resetSearchResult() {
    dropDown.innerHTML = "";
}

function displaySearchResult(games) {
  dropDown.innerHTML = "";
  if (games.length) {
    games.forEach((game) => {
        let li=document.createElement("li")
        li.innerText += `${game.name}`;
        li.addEventListener("click", ()=>{
            window.location = `/games/${game._id}`;
        })
        dropDown.appendChild(li)
    });
  } else {
    dropDown.innerHTML = `<li>sorry, no match found</li>`;
  }
}


function handleRead(evt, callback) {
    axios
    .get(`/games/api?name=${evt.target.value}`)
    .then((dataRes) => {
        console.log(dataRes.data) 
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


