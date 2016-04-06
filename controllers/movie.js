var User = require("../models/user");
var MovieList = require("../models/movielist");

module.exports = {
  addMovie: addMovie,
  addFavorites: addFavorites,
  addUnwatched: addUnwatched
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
        res.json(response);
      })
    }, function(err) {
      console.log('no user exists', err)
    })
}

function addFavorites(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user){
        console.log(req.body);
      user.favoriteMovies.push({
        title: req.body.title,
        poster_path: req.body.poster_path
      })
      user.save(function(err, response) {
        console.log('SAVED', response);
        console.log('ERROR', err)
        res.json(response);
      })
    }, function(err) {
      console.log('no user exists', err)
    })
}

function addUnwatched(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user){
        console.log(req.body);
      user.unwatchedMovies.push({
        title: req.body.title,
        poster_path: req.body.poster_path
      })
      user.save(function(err, response) {
        console.log('SAVED', response);
        console.log('ERROR', err)
        res.json(response);
      })
    }, function(err) {
      console.log('no user exists', err)
    })
}


