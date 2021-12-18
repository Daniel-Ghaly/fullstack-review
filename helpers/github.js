const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // var output;
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${(username)}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
  .then(res => {
    // console.log(res.data)
    callback(null, res.data)
    // output = res.data
  })
  .catch(err => {
    callback(err, null)
  })
}

module.exports.getReposByUsername = getReposByUsername;