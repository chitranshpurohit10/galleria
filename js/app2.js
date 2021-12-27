let imageNumber = localStorage.getItem("imageid");
var images2;

connect();


function connect() {
    var xhr2 = new XMLHttpRequest;
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4) {

            images2 = JSON.parse(xhr2.responseText);


            showSlides(imageNumber);


        }


    };

    xhr2.open('GET', 'data/data.json');
    xhr2.send();





}


function showSlides(imageNumber) {





    document.querySelectorAll(".nameimage")[0].innerHTML = images2[imageNumber].name;
    document.querySelector(".source").innerHTML = `<a href="${images2[imageNumber].source}" target="blank">GO TO SOURCE</a>`;
    document.getElementById("year").innerHTML = images2[imageNumber].year;
    let y = (parseInt(imageNumber) + 1) / parseInt(images2.length) * 100;
    document.getElementById("progress").style.width = `${y}%`;

    document.querySelector(".text").innerHTML = images2[imageNumber].description;
    document.querySelectorAll(".nameauthor")[0].innerHTML = images2[imageNumber].artist.name;
    document.querySelectorAll(".nameauthor")[1].innerHTML = images2[imageNumber].artist.name;
    document.getElementById("authorphoto").innerHTML = `<img src="${images2[imageNumber].artist.image}">`;
    document.querySelector(".largeimage").style.backgroundImage = `url("${images2[imageNumber].images.hero.small}")`;



}


function plusSlides(n) {

    imageNumber = parseInt(imageNumber) + n;

    if (imageNumber >= images2.length - 1) {
        imageNumber = 0;
    }
    if (imageNumber < 0) {
        imageNumber = images2.length - 1;
    }


    console.log(imageNumber);
    showSlides(imageNumber);


}

function imagemod() {
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = images2[imageNumber].images.hero.large;
    console.log(modalImg.src);
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };
}