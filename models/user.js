var mongoose  = require('mongoose'),
    debug     = require('debug')('app:models');

var userSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName:  {type: String, required: true},
  email:     {type: String, required: true, unique: true},
  watchedMovies: Array,
  favoriteMovies: Array,
  unwatchedMovies: Array,
  following: [{ type:mongoose.Schema.Types.ObjectId, ref:'User'}]
});

userSchema.methods.followers = function(){
  console.log(this._id);
  User.find({following: {$in: [this._id]}}, function(err, users) {
    console.log(users);
    return users;
  });
}

userSchema.plugin(require('mongoose-bcrypt'));

userSchema.options.toJSON = {
  transform: function(document, returnedObject, options) {
    delete returnedObject.password;
    return returnedObject;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;

