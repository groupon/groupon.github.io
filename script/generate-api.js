var fetch = require("node-fetch"),
    fs = require("fs"),
    mkdirp = require("mkdirp"),
    url = require("url"),
    clientID = process.env.clientID,
    clientSecret = process.env.clientSecret,

    getURL = function(path) {
      var urlObject = url.parse(path, true);

      urlObject.hostname = "api.github.com";
      urlObject.protocol = "https";
      urlObject.query.client_id = clientID;
      urlObject.query.client_secret = clientSecret;
      delete urlObject.search;

      return url.format(urlObject);
    },

    writeJSON = function(filename, json) {
      console.log(`Writing ${filename}`);
      fs.writeFile(filename, JSON.stringify(json));
    };

if (!process.env.clientID || !process.env.clientSecret) {
  console.error("You must provide a GitHub client ID and client secret via the clientID and clientSecret environment variables.");
  process.exit(1);
}

fetch(getURL("/orgs/groupon/repos?type=public&per_page=100"))
  .then(function(response) {
    return response.json();
  })
  .then(function(repos) {
    writeJSON("./public/api/repos.json", repos);
    return repos;
  })
  .then(function(repos) {
    repos.forEach(function(repo) {
      fetch(getURL(repo.languages_url))
        .then(function(response) {
          return response.json();
        })
        .then(function(languages) {
          var repoLanguagesFileName = repo.full_name.replace(/\//, "-"),
              pathToRepoLanguagesFile = "./public/api/repos/" + repo.name;
          mkdirp(pathToRepoLanguagesFile, function() {
            writeJSON(pathToRepoLanguagesFile + "/languages.json", languages);
          });
        });
    });
  });
