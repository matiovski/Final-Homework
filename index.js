//Home
let movies = ["Pokemon", "Harry Potter", "Dragon Ball"]

async function loadMovies() {
    for (i = 0; i < movies.length; i++) {
        let response = await fetch("https://www.omdbapi.com/?apikey=25475365&s=" + movies[i],
            { method: "GET" })
        let films = await response.json()
        console.log(films)
        let MoviesContainer = document.createElement("div")
        MoviesContainer.className = "movies-container"
        MoviesContainer.innerHTML = `<h3>"${movies[i]}"</h3>`
        let MyMovies = document.createElement("div")
        MyMovies.className = "movies-firstpage"
        for (w = 0; w < films.Search.length; w++) {
            MyMovies.innerHTML += `<div class="col-sm-6 col-md-4 col-lg-2 card-poster">  
            <img class="poster" src="${films.Search[w].Poster}">
            <a href="details.html?imdbID=${films.Search[w].imdbID}"><div class="overlay">
            <div class="info">
            <p class="title">${films.Search[w].Title} </p>
            <span class="badge badge-info" class="type">${films.Search[w].Type}</span>
            </div>
            </div>
            </a>
            </div>`
        }
        ChosenMovies.appendChild(MoviesContainer)
        MoviesContainer.appendChild(MyMovies)
    }
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
    } else {
        alert("You must insert a tv series!")
    }
}

function eliminate() {
    let list = document.querySelector("#mylist")
    list.innerHTML = ""
}

//Search
function search() {
    setTimeout(function () { $("[data-toggle=popover]").popover("hide") });
    let ChosenMovies = document.querySelector("#ChosenMovies")
    ChosenMovies.innerHTML = "";
    let searched = document.querySelector("#movie-search").value
    if (searched) {
        setTimeout(function () { $("[data-toggle=popover]").popover("hide") });
        loadSearch()
    }
    else {
        setTimeout(function () { $("[data-toggle=popover]").popover("show") });
    }

    async function loadSearch() {
        let clicked = document.querySelector(".card-clicked")
        clicked.innerHTML = "";
        let films = document.querySelector("#films")
        films.innerHTML = ""
        let url = "https://www.omdbapi.com/?apikey=25475365&s="
        let searched = document.querySelector("#movie-search").value
        let response = await fetch(url += searched)

        if (response.ok) {
            let movies = await response.json();
            if (movies.Search) {
                let list = document.createElement("div")
                list.className = "row"
                list.style.justifyContent = "center"
                let = document.querySelector("#films")
                for (i = 0; i < movies.Search.length; i++) {
                    list.innerHTML += `
                    <div class="col-sm-6 col-md-4 col-lg-2 card-poster">  
                    <img class="poster" src="${movies.Search[i].Poster}">
                    <a href="details.html?imdbID=${movies.Search[i].imdbID}"><div class="overlay">
                    <div class="info">
                    <p class="title">${movies.Search[i].Title} </p>
                    <span class="badge badge-info" class="type">${movies.Search[i].Type}</span>
                    </div>
                    </div></a>
                    </div>`
                    films.appendChild(list)
                }
            }
        }
    }
}

//Details
async function loadClicked(MovieId) {
    let response = await fetch("https://www.omdbapi.com/?apikey=25475365&i=" + MovieId,
        { method: "GET" })
    let TheInfo = await response.json()
    console.log(TheInfo)
    document.querySelector("#image").src = TheInfo.Poster
    let about = document.querySelector(".about")
    about.innerHTML =
        `<h2> ${TheInfo.Title}</h2>
    <p> <h5> Genre/Genres </h5> ${TheInfo.Genre}</p>
    <p> <h5> Year </h5> ${TheInfo.Year} </p>
    <p><h5> Runtime </h5>${TheInfo.Runtime}</p>
    <p> <h5> Language/Languages </h5>${TheInfo.Language}</p>
    <p> <h5> Country/Countries </h5> ${TheInfo.Country} </p>
    <p> <h5> Plot </h5> ${TheInfo.Plot}</p>
    <p> <h5> Actors </h5> ${TheInfo.Actors} </p>
    <p> <h5> Director/Directors </h5>${TheInfo.Director}</p>`
}