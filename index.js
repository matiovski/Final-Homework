//Home
let Movies = ["Harry Potter", "Lord of the Rings", "Matrix"]

async function loadMovies() {
    for (i = 0; i < MainMovies.length; i++) {
        let response = await fetch("http://www.omdbapi.com/?apikey=25475365&s=" + Movies[i],
            "method"= "GET")
        let Films = await response.json()
        console.log(Films)
        let MoviesContainer = document.createElement("div")
        MoviesContainer.className = "movies-container"
        MoviesContainer.innerHTML = `<h3> The best movies of "${Movies[i]}"</h3>`
        let myfilms = document.createElement("div")
        myfilms.className = "movies-firstpage"
    }
    for (y = 0; y < Films.Search.length; y++) {

        myfilms.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-2 card-poster">  
        <img class="poster" src="${Films.Search[y].Poster}">
        <a href="details.html?imdbID=${FIlms.Search[y].imdbID}"><div class="overlay">
        <div class="info">
        <p class="title">${Films.Search[y].Title} </p>
        <span class="badge badge-success" class="type">${Films.Search[y].Type}</span>
        </div>
        </div></a>
        </div>`
    }
    ChosenMovies.appendChild(MoviesContainer)
    MoviesContainer.appendChild(myfilms)

}

//My List
function add() {
    let ToWatch = document.querySelector("#add").value;
    let list = document.querySelector("#mylist")
    if (ToWatch) {
        let TheMovie = document.createElement("li")
        TheMovie.classList.add("list")
        TheMovie.innerText = ToWatch
        list.appendChild(TheMovie)

        TheMovie.addEventListener("click", (e) => e.currentTarget.classList.toggle("seen"))

    } else {
        alert("You must insert a tv series!")
    }
}

function eliminate() {
    let list = document.querySelector("#mylist")
    list.innerHTML = ""
}

function watched() {
    let checkbox = document.querySelector("#completd").checked
    if (checkbox) {
        let seen = document.querySelectorAll(".seen")
        for (let i = 0; i < seen.length; i++) {
            seen[i].classList.add("hidden")
        }
    }
    else {
        let hidden = document.querySelectorAll(".hidden")
        for (let i = 0; i < hidden.length; i++)
            hidden[i].classList.remove("hidden")
    }
}
