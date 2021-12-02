

const API_KEY = 'api_key=25254d4e06f0bd3b7e0a3b24c7b86fab';
const BASE_URL = 'https://api.themoviedb.org/3';
const NEW_RELEASES_URL = BASE_URL + "/discover/movie?"+ API_KEY +"&language=en-US&sort_by=popularity.desc&include_adult=false&&append_to_response=videos&page=3"
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const youTube_URL = "https://www.youtube.com/embed/"
const search_URL = BASE_URL + "/search/movie?" + API_KEY;
const main = document.getElementById("main");


// Fetch information from API using declared variables
getMovies(NEW_RELEASES_URL);

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
        const {title, poster_path, vote_average, overview,id,trailer} = movie;
        const key_url = BASE_URL + "/movie/" + movie.id + "/videos?" + API_KEY+"&append_to_response"
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
