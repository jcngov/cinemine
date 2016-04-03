var mongoose = require('./database');

var User = require('../models/user');

// var users = [
//   { // 0
//     firstName: "Jerry",
//     lastName:   "Ngov",
//     email: "j@email.com",
//     password: "abc123",
//     passwordConfirmation: "abc123"
//   },
// ];

// User.remove({}, function(err) {
//   if (err) console.log(err);
//   User.create(users, function(err, users) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Database seeded with " + users.length  + " users.");
//       mongoose.connection.close(function(err) {
//         if (err) console.log(err);
//         process.exit(0);
//       });
//     }
//   });
// });

User
  .remove({})
  .then(function() {
    console.log('All users removed…');

    return mongoose.connection.close();
  })
  .then(function() {
    process.exit(0);
  });
