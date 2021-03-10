const formStatusList = document.querySelector('.status-list');
const btnAddCollection = document.querySelector('.add-collection');
const checkboxes = document.querySelectorAll('.status-list input');


btnAddCollection.addEventListener('click', () => {
    formStatusList.classList.toggle('is-visible');
    
    
})

formStatusList.addEventListener('mouseleave', () => {
    formStatusList.classList.toggle('is-visible');
})


// Allow to tick only one checkbox at a time
checkboxes.forEach(box => {
    box.addEventListener('click', (evt) => {
        checkboxes.forEach(clickedBox => clickedBox !== evt.target ? clickedBox.checked = false : null)
    })
})