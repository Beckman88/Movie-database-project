

const API_KEY = 'api_key=25254d4e06f0bd3b7e0a3b24c7b86fab';
const BASE_URL = 'https://api.themoviedb.org/3';
const RATED_URL = BASE_URL + "/discover/movie?" + API_KEY + "&language=en-US&sort_by=vote_count.desc&include_adult=false&include_video=false&page=1&&with_watch_monetization_types=flatrate"
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");

// Fetch information from API using declared variables
getMovies(RATED_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
})
}


// Movie showcase interface

function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview,id} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
        <img src="${IMG_URL+poster_path}" alt="${title}">

            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                ${overview}
            </div>
        
        `

        main.appendChild(movieEl);

    })
}


const splash = document.querySelector(".splash");

document.addEventListener("DOMcontentLoaded", (e)=>{
    setTimeout(()=>{
        splash.classList.add("display-none");
    }, 2000)
})


//Color by rating

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

