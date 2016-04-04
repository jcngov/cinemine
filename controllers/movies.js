var request = require('request');
var dotenv  = require('dotenv').config();

var uri =  'https://api.themoviedb.org/3/';
var key = process.env.API_KEY;

function search(req, res, next) {
  request({
    method: 'GET',
    uri: uri + 'movie/550?api_key=' + key
  }, function (err, res, body) {
    if (!err) {
      var movie = JSON.parse(body);
      console.log(movie);
    }
  });
}

search();

