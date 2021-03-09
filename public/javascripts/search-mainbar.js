const inputSearchMainBar = document.getElementById('main-search-bar');

// export function searchBar(element, key, event) {
//     element.addEventListener(event, function (evt) {
//         if (evt.key === key) {
//             const search = element.value;
//             let query = `?name=${search}`;
//             window.location = `/games/search${query}`;
//             element.value = "";
//         }
//     })
// };

import {searchBar} from '/javascripts/search-navbar.js'

searchBar(inputSearchMainBar, 'Enter', 'keypress')

// inputSearchMainBar.addEventListener('keypress', function (evt) {
//     if (evt.key === 'Enter') {
//         const search = inputSearchMainBar.value;
//         let query = `?name=${search}`;

//         // axios.get(`/`)
//         //     .then(dataRes => {
//                 window.location = `/games/search${query}`;
//                 // console.log(dataRes);
//     //         })
//     //         .catch(dataErr => console.log(dataErr))
//     // }
// }})