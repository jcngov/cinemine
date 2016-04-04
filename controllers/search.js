var request = require('request');
var dotenv  = require('dotenv').config();


module.exports = {
  searchGenreAction: searchGenreAction
}

var uri =  'https://api.themoviedb.org/3/';
var parseMovie = function(body){
  return JSON.parse(body);
}
var genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 10769,
        "name": "Foreign"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]


var genreIds = [];
genres.forEach(function(genre) {
  if (genre.id) genreIds.push(genre.id)
})

var results = [];

function searchGenreAction(req, res, next) {

  request({
    method: 'GET',
    uri: uri + 'discover/movie?api_key=' + process.env.API_KEY + '&with_genres=' + genreIds[0] + '&page=1'
  }, function (err, response, body) {
    if (!err) {
      var movieGenre = parseMovie(body);
      movieGenre.results.forEach(function(movie) {
        var movieInfo = {};
        movieInfo.title = movie.title
        movieInfo.overview = movie.overview
        movieInfo.backdrop_path = movie.backdrop_path
        movieInfo.release_date = movie.release_date
        movieInfo.poster_path = movie.poster_path
        movieInfo.popularity = movie.popularity

        results.push(movieInfo);

      });
      res.send(results);
    } else {
      next(err);
    }

  });
}


