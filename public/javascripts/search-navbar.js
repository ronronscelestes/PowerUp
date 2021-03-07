//hide search icon on input focus
//placeholder appear on input focus
const inputSearchNavBar = document.getElementById('small-search-input');
const searchIcon = document.querySelector('#small-search-input + img');

inputSearchNavBar.addEventListener('focus', () => {
    inputSearchNavBar.placeholder = 'Look for a game, genre...';
    searchIcon.style.display = 'none';
})

inputSearchNavBar.addEventListener('blur', () => {
    inputSearchNavBar.placeholder = '';
    searchIcon.style.display = 'block';
})