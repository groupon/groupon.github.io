var fetch = require("node-fetch"),
    fs = require("fs"),
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
    };

fetch(getURL("/orgs/groupon/repos?type=public&per_page=100"))
  .then(function(response) {
    return response.json();
  })
  .then(function(repos) {
    fs.writeFile("json/repos.json", JSON.stringify(repos));
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
              pathToRepoLanguagesFile = "json/" + repoLanguagesFileName + ".languages.json";
          fs.writeFile(pathToRepoLanguagesFile, JSON.stringify(languages));
        });
    });
  });
