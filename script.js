const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=d50b44e3ff247507730f3c53930c27e2";
const API_URL_MOVIE =
  BASE_URL + "/discover/movie?" + API_KEY + "&sort_by=popularity.desc&page=1";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?" + API_KEY;

let formMovie = document.getElementById("form-movie");
let searchMovie = document.getElementById("search-movie");
let containerMovie = document.getElementById("list-movie");

getMovie(API_URL_MOVIE);

async function getMovie(url) {
  let response = await fetch(url);
  let dataMovies = await response.json();
  displayMovies(dataMovies.results);
  console.log(dataMovies.results);
}

function displayMovies(movies) {
  containerMovie.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, release_date, vote_average } = movie;
    const moviesElement = document.createElement("div");
    moviesElement.classList.add("row");
    moviesElement.innerHTML = `
    
    <div class="col "> 

    <div class="card mt-5 mx-2 border border-3" style="width:280px; height: 620px;">
    <img src="${IMG_URL + poster_path}" alt="${title}" >
  <div class="card-body">
    <h3 class="card-title text-center ">${title}</h3>

    <div class="row mt-2">
    <div class="col">

    <div class="row "><h5 class="text-center text-dark text-opacity-75"> Release </h5> </div>
    <div class="row"><h5 class="text-center text-info"> ${release_date} </h5> </div>
    </div>
    <div class="col">

    <div class="row"><h5 class="text-center text-dark text-opacity-75"> Rating </h5> </div>
    <div class="row"><h5 class="text-center text-warning"> ${vote_average} </h5> </div>
    </div>
    
    </div>

  </div>
</div>
    </div>
        `;

    containerMovie.appendChild(moviesElement);
  });
}

formMovie.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchMovies = searchMovie.value;

  if (searchMovies) {
    getMovie(SEARCH_URL + "&query=" + searchMovies + "&page=1");
  } else {
    getMovie(url);
  }
});
