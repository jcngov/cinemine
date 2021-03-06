var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var tokenController = require('../config/token_auth');
var movieController = require('../controllers/search');
var movieListController = require('../controllers/movie');

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get( '/users/me', tokenController.authenticate, usersController.me);
router.put('/users/me/follow', tokenController.authenticate, usersController.follow);
router.get('/users/:id', usersController.show);

router.post('/token', tokenController.create);
router.post('/users/me/token', tokenController.authenticate, tokenController.refresh);

// SEARCH MOVIES CONTROLLER:
router.get('/movies/search', movieController.search);
router.get('/images/:id', movieController.getMovieImages);

// MOVIES CONTROLLER:
router.put('/users/watchedmovies', tokenController.authenticate, movieListController.addMovie);
router.put('/users/favorites', tokenController.authenticate, movieListController.addFavorites);
router.put('/users/unwatched', tokenController.authenticate, movieListController.addUnwatched);
router.delete('/users/watchedmovies', tokenController.authenticate, usersController.removeWatched);
router.delete('/users/unwatched', tokenController.authenticate, usersController.removeUnwatched);
router.delete('/users/favorites', tokenController.authenticate, usersController.removeFavorites);

