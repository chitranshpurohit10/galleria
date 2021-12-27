var xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {

        var images = JSON.parse(xhr.responseText);
        console.log(images[0].name);
        var list = "";
        for (let i = 0; i < images.length; i += 4) {
            list += `<a href="slideshow.html"><img src="${images[i].images.thumbnail}" id="${i}"></a>`;


            console.log(i);

        }
        var list2 = "";
        for (let i = 1; i < images.length; i += 4) {
            list2 += `<a href="slideshow.html"><img src="${images[i].images.thumbnail}" id="${i}"></a>`;;
            console.log(i);
        }

        var list3 = "";
        for (let i = 2; i < images.length; i += 4) {
            list3 += `<a href="slideshow.html"><img src="${images[i].images.thumbnail}" id="${i}"></a>`;

        }

        var list4 = "";
        for (let i = 3; i < images.length; i += 4) {
            list4 += `<a href="slideshow.html"><img src="${images[i].images.thumbnail}" id="${i}"></a>`;

        }

        document.querySelector(".col1").innerHTML = list;
        document.querySelector(".col2").innerHTML = list2;
        document.querySelector(".col3").innerHTML = list3;
        document.querySelector(".col4").innerHTML = list4;

        document.querySelector(".col1").addEventListener("click", function(event) {
            console.log(event.target);
            let hello = event.target.id;
            localStorage.setItem("imageid", hello);
        });

        document.querySelector(".col2").addEventListener("click", function(event) {
            console.log(event.target);
            let hello = event.target.id;
            localStorage.setItem("imageid", hello);
        });

        document.querySelector(".col3").addEventListener("click", function(event) {
            console.log(event.target);
            let hello = event.target.id;
            localStorage.setItem("imageid", hello);
        });

        document.querySelector(".col4").addEventListener("click", function(event) {
            console.log(event.target);
            let hello = event.target.id;
            localStorage.setItem("imageid", hello);
        });

    }



};

xhr.open('GET', 'data/data.json');
xhr.send();