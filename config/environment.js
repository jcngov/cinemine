var _ = require('lodash');

var localEnvVars = {
  TITLE:      'cinemine',
  SAFE_TITLE: 'cinemine'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
