const FormStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
// const checkboxesGameStatus=document.querySelectorAll('.game-status')
const currentPlayCheckbox=document.querySelector(".game-status.currentPlay")
const AlreadyPlayCheckbox=document.querySelector(".game-status.alreadyPlayed")
const WantToPlayCheckbox=document.querySelector(".game-status.wantToPlay")

btnAddCollection.addEventListener('click', () => {
    FormStatusList.classList.toggle('is-visible');
    
})

FormStatusList.addEventListener('mouseleave', () => {
    FormStatusList.classList.toggle('is-visible');
})

// function updateUser(id, name) {
//     return axios.patch(`/api/users/${id}`, { name });
//   }

function ChangeGameStatus(evt){
const idGame=evt.target.getAttribute("data-game-id")
const gameStatus = evt.target.name
    axios
    .patch(`/games/${idGame}?name=${gameStatus}`)
    .then((dataRes) => {
        console.log(dataRes.data)}) 
        // callback(dataRes.data)})
    .catch((apiError) => console.log(apiError));
}

currentPlayCheckbox.addEventListener("change", ChangeGameStatus)
AlreadyPlayCheckbox.addEventListener("change", ChangeGameStatus)
WantToPlayCheckbox.addEventListener("change", ChangeGameStatus)

// checkboxesGameStatus.forEach((checkbox)=>{checkbox.addEventListener("click", ChangeGameStatus)

// })

