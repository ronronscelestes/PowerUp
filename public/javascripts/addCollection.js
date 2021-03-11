const formStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
const checkboxes = document.querySelectorAll('.status-list input');

const currentPlayCheckbox=document.querySelector(".game-status.currentPlay")
const AlreadyPlayCheckbox=document.querySelector(".game-status.alreadyPlayed")
const WantToPlayCheckbox=document.querySelector(".game-status.wantToPlay")

btnAddCollection.addEventListener('click', () => {
    formStatusList.classList.toggle('is-visible');
})

// formStatusList.addEventListener('mouseleave', () => {
//     formStatusList.classList.toggle('is-visible');
// })


// Allow to tick only one checkbox at a time
checkboxes.forEach(box => {
    box.addEventListener('click', (evt) => {
        checkboxes.forEach(clickedBox => clickedBox !== evt.target ? clickedBox.checked = false : null)
    })
})

function ChangeGameStatus(evt){
    const idGame = evt.target.getAttribute("data-game-id")
    const gameStatus = evt.target.name
    
    axios
    .patch(`/games/${idGame}?name=${gameStatus}`)
    .then((dataRes) => {
        console.log(dataRes.data)
        console.log(evt.target)
        giveBoxCheckedClass(dataRes.data, gameStatus, evt.target, idGame)
    }) 
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


