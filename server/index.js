const express = require('express');
let app = express();
const github = require('../helpers/github.js')
const mongoose = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json())
app.post('/repos', function (req, res) {


  github.getReposByUsername(req.body.username, (err, repoData) => {
    if (err) {
      console.log(err)
    } else {
      mongoose.save(repoData, (err, userRepos) => {
        if (err) {
          console.log(err)
        }
        else {
          console.log('ta')
          console.log(userRepos)

          // axios.get('/repos')
          // .then(res => {
          //   this.setState({repos:res.data})
          // })
          res.status(201).send(userRepos)
        }
      })
    }
  })
  debugger;

  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {

  mongoose.getTop25((err, top25)=> {
    if (err) {
      console.error(err)
    } else {
      res.send(top25)
    }
  })
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

