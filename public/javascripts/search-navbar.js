//hide search icon on input focus
//placeholder appear on input focus
const inputSearchNavBar = document.getElementById('small-search-input');
const searchIcon = document.querySelector('#small-search-input + img');

//make searchbar-navbar works as the main search bar
export function searchBar(element, key, event) {
    element.addEventListener(event, function (evt) {
        if (evt.key === key) {
            const search = element.value;
            let query = `?name=${search}`;
            window.location = `/games/search${query}`;
            element.value = "";
        }
    })
};


if(inputSearchNavBar) {
    searchBar(inputSearchNavBar, 'Enter', 'keypress');

    inputSearchNavBar.addEventListener('focus', () => {
        inputSearchNavBar.placeholder = 'Look for a game';
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
});

navBar.addEventListener('mouseleave', () => {
    authWidget.classList.add('hide');
});



