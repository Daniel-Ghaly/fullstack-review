const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {
    type: Number,
    unique: true
  },
  repo_owner: String,
  repo_name: String,
  repo_url: String,
  fork_count: Number
});

var Repo = mongoose.model('Repo', repoSchema);
var userRepos;

var save = (repoData, callback) => {
  // var dataSaved = false;

  var mapped= repoData.map(repo => {
    return {
      repo_id: repo.id,
      repo_name: repo.name,
      repo_owner: repo.owner.login,
      repo_url: repo.html_url,
      fork_count: repo.forks
    }
  })

  // console.log(mapped)

  // console.log(mapped[0]['repo_owner'])

  // Repo.insertMany(mapped)
  // .then(function(){
  //   console.log("Data inserted")
  //    // Success
  //    Repo.find((err, repo) => {
  //      console.log('start: ',repo)
  //    })})
  //    .catch(function(error){
  //     console.log(error)      // Failure
  //   });


    // await Repo.deleteMany({repo_owner: mapped[0]['repo_owner']})

  // delete potential duplicates and re-insert
  Repo.deleteMany({repo_owner: mapped[0]['repo_owner']})
  .then(res => {
    console.log('deleted', res)

    Repo.insertMany(mapped)
    .then(function(){
      console.log("Data inserted")
      // Success
      Repo.find((err, arr) => {
        userRepos = arr.slice()
        console.log('userrepos',userRepos)
        callback(null, userRepos)

        // console.log('start: ',repo)
      })
      // dataSaved = true;
     })
    .catch(function(error){
      callback(error, null)      // Failure
    });

  })
  .catch(function(error){
    console.error(error)      // Failure
  });





  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

}

var getTop25 = (callback) => {
  var top25 = [];

  const query = Repo.find()
  query.sort({fork_count:-1}).limit(25).exec((err, arr) => {
        console.log('arr',arr)
        top25 = arr.slice()
        if (err) {
          callback(err, null)
        }
          callback(null, top25)
      })


    // ))
  // const query = Repo.find()
  // query.sort({fork_count:1})
  // .then(query.limit(25)
  //   .exec((err, arr) => {
  //     console.log('arr',arr)
  //   }

  // ))


  // .limit(25)
  // .find((err, arr) => {
  //   if (err) {
  //     callback(err, null)
  //   } else {
  //     top25 = arr.slice()
  //     callback(null, top25 )
  //   }

  }



module.exports.save = save;
module.exports.getTop25 = getTop25;