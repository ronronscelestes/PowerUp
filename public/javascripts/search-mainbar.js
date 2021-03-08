const inputSearchMainBar = document.getElementById('main-search-bar');


inputSearchMainBar.addEventListener('keypress', function (evt) {
    if (evt.key === 'Enter') {
        const search = inputSearchMainBar.value;
        let query = `?name=${search}`;

        axios.get(`/games/search${query}`)
            .then(dataRes => {
                window.location = `/games/search${query}`;
                console.log(dataRes);
            })
            .catch(dataErr => console.log(dataErr))
    }
})