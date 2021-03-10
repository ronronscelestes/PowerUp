const FormStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
const currentPlayCheckbox=document.querySelector(".game-status.currentPlay")
const AlreadyPlayCheckbox=document.querySelector(".game-status.alreadyPlayed")
const WantToPlayCheckbox=document.querySelector(".game-status.wantToPlay")

btnAddCollection.addEventListener('click', () => {
    FormStatusList.classList.toggle('is-visible');
    
})

FormStatusList.addEventListener('mouseleave', () => {
    FormStatusList.classList.toggle('is-visible');
})


function ChangeGameStatus(evt){
const idGame=evt.target.getAttribute("data-game-id")
const gameStatus = evt.target.name
    axios
    .patch(`/games/${idGame}?name=${gameStatus}`)
    .then((dataRes) => {
        console.log(dataRes.data)
        console.log(evt.target)
        giveBoxCheckedClass(dataRes.data, gameStatus, evt.target, idGame)}) 
    .catch((apiError) => console.log(apiError));
}

function giveCheckedBoxClass (data, gameStatus,checkBox, idGame){
    if (data[`${gameStatus}`].includes(idGame)){
        checkBox.classList.add('checkedBox')
    }
}

//Faire un addEventlistener générique
currentPlayCheckbox.addEventListener("change", ChangeGameStatus)
AlreadyPlayCheckbox.addEventListener("change", ChangeGameStatus)
WantToPlayCheckbox.addEventListener("change", ChangeGameStatus)


