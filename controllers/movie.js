var User = require("../models/user");
var MovieList = require("../models/movielist");

module.exports = {
  addMovie: addMovie
}


function addMovie(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user){
        console.log(req.body);
      user.watchedMovies.push({
        title: req.body.title,
        poster_path: req.body.poster_path
      })
      user.save(function(err, response) {
        console.log('SAVED', response);
        console.log('ERROR', err)
      })
      res.json({
        success: 'movie added'
      })
    }, function(err) {
      console.log('no user exists', err)
    })
}
