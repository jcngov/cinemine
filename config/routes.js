var express = require('express'),
    router  = new express.Router();

module.exports = router;

var usersController = require('../controllers/users');

router.get('/users', usersController.index);
router.post('/users', usersController.create);
router.get('/users/:id', usersController.show);
