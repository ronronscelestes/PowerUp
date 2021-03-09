console.log("rating-color is called")

const metacriticDiv = [...document.querySelectorAll(".rating")]
console.log(metacriticDiv)
metacriticDiv.forEach(div => {
    let rate = [...div.childNodes][0].innerText;
    if (rate < 75) {
        div.style.backgroundColor = "#FFC300";
    } else if (rate < 50) {
        div.style.backgroundColor = "#E42424";
    }
})


