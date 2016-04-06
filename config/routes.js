var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var tokenController = require('../config/token_auth');
var movieController = require('../controllers/search');
var movieListController = require('../controllers/movie');

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.get( '/users/me', tokenController.authenticate, usersController.me);

router.post('/token', tokenController.create);
router.post('/users/me/token', tokenController.authenticate, tokenController.refresh);

// SEARCH MOVIES CONTROLLER:
router.get('/movies/search', movieController.search);
router.get('/images/:id', movieController.getMovieImages);
// router.get('/moviebytitle', movieController.searchTitle);

router.put('/users/:id/movielist', tokenController.authenticate, movieListController.addMovie);
router.put('/users/:id/favorites', tokenController.authenticate, movieListController.addFavorites);
