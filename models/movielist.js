var mongoose = require('mongoose'),
    debug    = require('debug')('app:models'),
    User     = require('./user.js');

var movieSchema = new mongoose.Schema({
  title:         {type: String},
  tagline:       {type: String},
  overview:      {type: String},
  poster_path:   {type: String},
  backdrop_path: {type: String},
  release_date:  {type: Date},
  genre_ids:     {type: Number},
  popularity:    {type: Number}
});

var favoritesSchema = new mongoose.Schema({
  movies: [movieSchema],
});

var movieListSchema = new mongoose.Schema({
  movies:          [movieSchema],
  favorite_movies: [favoritesSchema],
  creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
           }
});

var Movielist = mongoose.model('Movielist', movieListSchema);

module.exports = Movielist;

// where to put movie bank?


