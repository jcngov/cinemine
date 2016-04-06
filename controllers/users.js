// Require resource's model(s).
var User = require("../models/user");

module.exports = {
  index:  index,
  show:   show,
  create: create,
  me: me
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
        message: "HUUUHHHHHHHHH Could not find user because " + err
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
