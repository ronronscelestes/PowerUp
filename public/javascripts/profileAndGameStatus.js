// const BtnCurrentPlay = document.getElementById("CurrentPlay");
// const BtnAlreadyPlayed = document.getElementById("AlreadyPlayed");
// const BtnWantToPlay = document.getElementById("WantToPlay");

// DOM EVENT LISTENERS

// window.onload= {
    
// }

const readAllGames = () => {
  axios.get('/profile/games')
  .then(apiRes => console.log(apiRes.data))
  .catch(err => console.log(err));
}

readAllGames();



// function ReadCollection() {
//     console.log('into read collection')
//   return axios.get(`/profile/games`);
// }
// //Handler functions

// function DisplayCurrentPlay() {
//   console.log("bonjour currently");
//   ReadCollection()
//     .then(user => console.log("games currently playing", user.currentPlay))
//     .catch((err)=>console.log(err))
// }

// function DisplayWantToPlay() {
//   console.log("bonjour want to");
//   ReadCollection()
//     .then(user => console.log(user.wantToPlay))
//   .catch((err)=>console.log(err))
// }



// BtnCurrentPlay.addEventListener("click", DisplayCurrentPlay);
// BtnWantToPlay.addEventListener("click", DisplayWantToPlay);


