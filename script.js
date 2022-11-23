function getImdbLink(imdbId) {
    return 'https://www.imdb.com/title/' + imdbId + '/';
}

function addMoviesToDom(movies) {
    const movieList = document.getElementById('movie-list');

    // Clear the movie list
    movieList.innerHTML = '';

    movies.forEach(function (movie) {
        // Create list item
        const newLi = document.createElement('li');
        movieList.appendChild(newLi);
        //console.log(newLi.innerHTML);

        // Create link
        const newATag = document.createElement('a');
        newATag.href = getImdbLink(movie.imdbID);
        newATag.target = '_blank';
        newLi.appendChild(newATag);
        //console.log(newATag.href);

        // Create poster image
        const newPoster = document.createElement('img');
        newPoster.alt = movie.title;
        newPoster.src = movie.poster;
        newATag.appendChild(newPoster);
        //console.log(newPoster.src);
    });
}

addMoviesToDom(movies);

function filterMovies(wordInMovie) {
    const lowerCaseWordInMovie = wordInMovie.toLowerCase();
    addMoviesToDom(movies.filter(function (movie) {
        const lowerCaseMovieTitle = movie.title.toLowerCase();
        return lowerCaseMovieTitle.includes(lowerCaseWordInMovie);
    }));
}

function filterLatestMovies() {
    addMoviesToDom(movies.filter(function (movie) {
        return movie.year.substring(0, 4) >= 2014;
    }));
}


const searchBarFilter = document.getElementById('searchbar-filter');
searchBarFilter.addEventListener('keyup', function (event) {
    if(event.key === 'Enter') {
        filterMovies(event.target.value);
    }
});


function handleOnChangeEvent(event) {
    console.log(event.target.value);
    switch (event.target.value) {
        case 'latest movies':
            filterLatestMovies();
            break;
        case 'avenger movies':
            filterMovies('Avenger');
            break;
        case 'x-men movies':
            filterMovies('X-Men');
            break;
        case 'princess movies':
            filterMovies('Princess');
            break;
        case 'batman movies':
            filterMovies('Batman');
            break;
    }
}


function addEventListeners() {
    const radioButtons = document.getElementsByName('film-filter');
    radioButtons.forEach(function (radioButton) {
        radioButton.addEventListener('change', handleOnChangeEvent);
    });
}

addEventListeners()
