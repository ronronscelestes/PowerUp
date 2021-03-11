const formStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
const checkboxes = document.querySelectorAll('.status-list input');

const currentPlayCheckbox=document.querySelector(".game-status.currentPlay")
const AlreadyPlayCheckbox=document.querySelector(".game-status.alreadyPlayed")
const WantToPlayCheckbox=document.querySelector(".game-status.wantToPlay")

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

function giveCheckedBoxClass (data, gameStatus, clickedCheckBox, idGame){
    if (data[`${gameStatus}`].includes(idGame)){
        checkboxes.forEach(checkbox => {
            if(checkbox.parentNode.children[2]) {
                checkbox.parentNode.children[2].remove();
            }
            if(checkbox === clickedCheckBox) {
                let img = document.createElement('img');
                img.src = '/images/checked-icon.svg';
                checkbox.parentNode.appendChild(img);
            };
        })
    }
}

function ChangeGameStatus(evt){
    const idGame = evt.target.getAttribute("data-game-id")
    const gameStatus = evt.target.name
    
    axios
    .patch(`/games/${idGame}?name=${gameStatus}`)
    .then((dataRes) => {
        console.log('Toto');
        // console.log(dataRes.data);
        // console.log(evt.target);
        if (dataRes.data === "toto") window.location = `/games/${idGame}`;

        giveCheckedBoxClass(dataRes.data, gameStatus, evt.target, idGame);
    }) 
    .catch((apiError) => console.log(apiError));
}


//Faire un addEventlistener générique
currentPlayCheckbox.addEventListener("change", ChangeGameStatus)
AlreadyPlayCheckbox.addEventListener("change", ChangeGameStatus)
WantToPlayCheckbox.addEventListener("change", ChangeGameStatus)


