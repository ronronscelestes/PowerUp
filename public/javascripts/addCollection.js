const formStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
const checkboxes = document.querySelectorAll('.status-list input');

const currentPlayCheckbox=document.querySelector(".game-status.currentPlay")
const AlreadyPlayCheckbox=document.querySelector(".game-status.alreadyPlayed")
const WantToPlayCheckbox=document.querySelector(".game-status.wantToPlay")


//collection widget appears-disappears
btnAddCollection.addEventListener('click', () => {
    formStatusList.classList.remove('is-hidden');
})

formStatusList.addEventListener('mouseleave', () => {
    formStatusList.classList.add('is-hidden');
})

// Allow to tick only one checkbox at a time
checkboxes.forEach(box => {
    box.addEventListener('click', (evt) => {
        checkboxes.forEach(clickedBox => clickedBox !== evt.target ? clickedBox.checked = false : null)
    })
})

//remove any tick img from any checkbox that add one
//add tick img to the checkbox that was clicked
const img = document.createElement('img');
img.src = '/images/checked-icon.svg';

function updateTickCheckboxes(data, gameStatus, clickedCheckBox, idGame){
    //data === user
    checkboxes.forEach(checkbox => {

        if(!checkbox.checked) {
            if(checkbox.parentNode.children[2]) {
                checkbox.parentNode.children[2].remove();
            }
        } else if(checkbox.checked) {
            checkbox.parentNode.appendChild(img);
        }
    })

}


//on checkbox click axios patch user collection to remove game from any user collection
//then add it to one collection depending on which checkbox was clicked
//call update tickCheckboxes
function ChangeGameStatus(evt){
    const idGame = evt.target.getAttribute("data-game-id")
    const gameStatus = evt.target.name
    
    axios
    .patch(`/games/${idGame}?name=${gameStatus}`)
    .then((dataRes) => {
        updateTickCheckboxes(dataRes.data, gameStatus, evt.target, idGame);
    }) 
    .catch((apiError) => console.log(apiError));
}


//Faire un addEventlistener générique
currentPlayCheckbox.addEventListener("change", ChangeGameStatus)
AlreadyPlayCheckbox.addEventListener("change", ChangeGameStatus)
WantToPlayCheckbox.addEventListener("change", ChangeGameStatus)



//Back to results event
const goBackButton = document.getElementById('go-back-button');
goBackButton.addEventListener('click', () => window.history.back());



