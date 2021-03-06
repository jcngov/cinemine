// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  index:  index,
  show:   show,
  create: create,
  me: me,
  follow: follow,
  removeWatched: removeWatched,
  removeUnwatched: removeUnwatched,
  removeFavorites: removeFavorites
}

function index(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      res.json({messsage: err});
    } else {
      res.json({
        success: true,
        data: users
      });
    }
  });
}

function show(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) {
      res.json({
        message: "HUUUHHHHHHHHH Could not find user because "  + err
      });
    } else if (!user) {
      res.json({
        message: "No user with this id"
      });
    } else {
      console.log(user.followers());
      res.json({
        success: true,
        message: "User Retrieved!",
        data: user
      })
    }
  });
};

function create(req, res, next) {
  if (!req.body.password) {
    return res.status(422).send("Missing required fields");
  }
  User
    .create(req.body)
    .then(function(user){
      res.json({
        success: true,
        message: "User Created!",
        data: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    }).catch(function(err){
      if (err.message.match(/E11000/)) {
        err.status = 409;
      } else {
        err.status = 422;
      }
      next(err);
    });
};

function me(req, res, next) {
  console.log("HERROOOOOO");
  console.log(req.decoded._id);
  User
    .findById(req.decoded._id).exec()
    .then(function(user) {
      console.log(user);
      res.json(user);
    })
    .catch(function(err) {
      next(err);
    });
};

function follow(req, res, next) {
   User.findById(req.decoded._id).populate('following', 'firstName').exec()
     .then(function(user){
     console.log(req.body);
       user.following.push(req.body)
       user.save(function(err, response) {
         console.log('SAVED', response);
         console.log('RESPONSE: ', response.following);
         console.log('ERROR', err)
         res.send(response);
       })
     }, function(err) {
       console.log('NOT FOLLOWING', err)
     })
}

function removeWatched(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      user.watchedMovies.remove(
        { title: req.body.title,
          id: req.body.id,
          poster_path: req.body.poster_path
        }, function(err) {
            if (!err) {
              console.log('removed watched movie');
            }
            else {
              console.log('error');
            }
          });
      console.log("no more: ", user.watchedMovies)
      user.save(function(err, user) {
        if (err) { res.send(err) }
          console.log("woohoo")
        res.send(user);
      });
    })
}

function removeUnwatched(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      user.unwatchedMovies.remove(
        { title: req.body.title,
          poster_path: req.body.poster_path
        }, function(err) {
            if (!err) {
              console.log('removed watched movie');
            }
            else {
              console.log('error');
            }
          });
      console.log("no more: ", user.unwatchedMovies)
      user.save(function(err, user) {
        if (err) { res.send(err) }
          console.log("woohoo")
        res.send(user);
      });
    })
}

function removeFavorites(req, res, next) {
  User.findById(req.decoded._id).exec()
    .then(function(user) {
      user.favoriteMovies.remove(
        { title: req.body.title,
          poster_path: req.body.poster_path
        }, function(err) {
            if (!err) {
              console.log('removed watched movie');
            }
            else {
              console.log('error');
            }
          });
      console.log("no more: ", user.favoriteMovies)
      user.save(function(err, user) {
        if (err) { res.send(err) }
          console.log("woohoo")
        res.send(user);
      });
    })
}
