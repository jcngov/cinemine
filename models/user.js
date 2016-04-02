var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  firstName:            {type: String, required: true},
  lastName:             {type: String, required: true},
  email:                {type: String, required: true, unique: true},
  password:             {type: String, required: true},
  passwordConfirmation: {type: String, required: true}
});

var User = mongoose.model('User', userSchema);

module.exports = User;

// how to model users following users
