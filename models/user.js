var mongoose  = require('mongoose'),
    debug     = require('debug')('app:models');
    // Movielist = require('./movielist.js');

// var movieSchema = new mongoose.Schema({
//   title:         {type: String},
//   tagline:       {type: String},
//   overview:      {type: String},
//   poster_path:   {type: String},
//   backdrop_path: {type: String},
//   release_date:  {type: Date},
//   genre_ids:     {type: Number},
//   popularity:    {type: Number}
// });

// var favoritesSchema = new mongoose.Schema({
//   movies: [movieSchema],
// });

// var movieListSchema = new mongoose.Schema({
//   movies:          [movieSchema],
//   favorite_movies: [favoritesSchema],
// });

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName:  {type: String, required: true},
  email:     {type: String, required: true, unique: true},
  watchedMovies: Array,
  favoriteMovies: Array,
  unwatchedMovies: Array
});

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;

// how to model users following users
