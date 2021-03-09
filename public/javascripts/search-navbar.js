//hide search icon on input focus
//placeholder appear on input focus
const inputSearchNavBar = document.getElementById('small-search-input');
const searchIcon = document.querySelector('#small-search-input + img');

if(inputSearchNavBar) {
    inputSearchNavBar.addEventListener('focus', () => {
        inputSearchNavBar.placeholder = 'Look for a game, genre...';
        searchIcon.style.display = 'none';
    })
    
    inputSearchNavBar.addEventListener('blur', () => {
        inputSearchNavBar.placeholder = '';
        searchIcon.style.display = 'block';
    })
}


//auth icon that deals with auth - profile etc
const authIcon = document.getElementById('auth-icon');
const authWidget = document.getElementById('auth-widget');
const navBar = document.getElementById('nav-bar')

authIcon.addEventListener('mouseenter', () => {
    authWidget.classList.remove('hide');
})

navBar.addEventListener('mouseleave', () => {
    authWidget.classList.add('hide');
})