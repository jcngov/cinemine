var request = require('request');
var dotenv  = require('dotenv').config();
var _ = require('lodash');

module.exports = {
  search: search,
  getMovieImages: getMovieImages
}

function search(req, res, next) {
  var uri = searchMoviesUri({
    type:  req.query.type,
    query: req.query.query,
    page:  req.query.page
  });

  request({
    method: 'GET',
    uri:    uri,
    json:   true
  }, function (err, response, body) {
    if (err) return next(err);

    var movies = body.results;
    var results = movies.map(function(movie) {
      return _.pick(movie, [
        'id',
        'title',
        'overview',
        'backdrop_path',
        'release_date',
        'poster_path',
        'popularity'
      ]);
    });

    res.json({
      page:          body.page,
      total_results: body.total_results,
      total_pages:   body.total_pages,
      results:       results
    });
  });
}


/**
 * Builds a search URI dynamically based on a passed in object.
 *
 * @param options: Object
 *   - type: genre, title
 *   - query: the actual search query (a genre or title)
 *   - page: optional, defaults to 1
 */
function searchMoviesUri(options) {
  var baseUri  = 'https://api.themoviedb.org/3/',
      keyQuery = '?api_key=' + process.env.API_KEY,
      path,
      queryKey,
      queryValue,
      pagePart = '&page=',
      page     = options.page || 1;

      // https://api.themoviedb.org/3/discover/movie?api_key=cc1a250976435d7599c77f097de90b21&sort_by=popularity.desc

  if (options.type == 'genre') {
    path       = 'discover/movie';
    queryKey   = '&with_genres=';
    queryValue = genreId(options.query);
  } else if (options.type == 'title') {
    path       = 'search/movie';
    queryKey   = '&query=';
    queryValue = options.query;
  } else if (options.type == 'popular') {
    path       = 'discover/movie';
    queryKey   = '&sort_by=';
    queryValue = 'popularity.desc';
  }

  return baseUri + path + keyQuery + queryKey + queryValue + pagePart + page;
}

/**
 * Maps a series of genre names to ids meaningful to our Movie API.
 *
 * @param genreName: String
 */
function genreId(genreName) {
  genreName = genreName.toLowerCase();
  var genreIds = {
    'action':      28,
    'adventure':   12,
    'animation':   16,
    'comedy':      35,
    'crime':       80,
    'documentary': 99,
    'drama':       18,
    'family':      10751,
    'fantasy':     14,
    'foreign':     10769,
    'history':     36,
    'horror':      27,
    'music':       10402,
    'mystery':     9648,
    'romance':     10749,
    'science fiction': 878,
    'tv movie':    10770,
    'thriller':    53,
    'war':         10752,
    'western':     37
  };

  return genreIds[genreName];
}

function getMovieImages(req, res, next) {
  var baseUri  = 'https://api.themoviedb.org/3/',
      keyQuery = '?api_key=' + process.env.API_KEY,
      id       = req.params.id

  request({
    method: 'GET',
    uri:    baseUri + 'movie/' + id + '/images' + keyQuery,
    json:   true
  }, function (err, response, body) {
    if (err) return next(err);

    var results = body.backdrops;
    res.send({results: results});
    });

}



