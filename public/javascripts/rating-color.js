/* Colorize the background based on the rating value. To work need to follow this HTML structure 
<tag class="rating">
    <tag>ratingValue</tag>
</tag>
*/

const metacriticDiv = [...document.querySelectorAll(".rating")]
metacriticDiv.forEach(div => {
    let rate = [...div.childNodes][0].innerText;
    if (rate < 75) {
        div.style.backgroundColor = "#FFC300";
    } else if (rate < 50) {
        div.style.backgroundColor = "#E42424";
    }
})


