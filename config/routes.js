var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');
var tokenController = require('../config/token_auth');
var movieController = require('../controllers/search');

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
router.get( '/users/me', tokenController.authenticate, usersController.me);

router.post('/token', tokenController.create);
router.post('/users/me/token', tokenController.authenticate, tokenController.refresh);

// SEARCH MOVIES CONTROLLER:
router.get('/actionmovies', movieController.searchGenreAction);
