var fetch = require("node-fetch"),
    fs = require("fs"),
    url = require("url"),
    categories = require("./categories.json"),
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

    groupByCategory = function(repos) {
      return categories.map(function(category) {
        return {
          name: category.name,
          repos: category.repos.map(function(repoName) {
            return repos.find(function(repo) {
              return repo.name === repoName;
            });
          })
        }
      });
    };


fetch(getURL("/orgs/groupon/repos?type=public&per_page=100"))
  .then(function(response) {
    return response.json();
  })
  .then(function(repos) {
    return repos;
  })
  .then(function(repos) {
    return Promise.all(repos.map(function(repo) {
      return fetch(getURL(repo.languages_url))
        .then(function(response) {
          return response.json();
        })
        .then(function(languages) {
          repo.languages = languages;
          return repo;
        });
    }));
  })
  .then(function(repos) {
    var groupedRepos = groupByCategory(repos);
    fs.writeFile("./json/repos.json", JSON.stringify(groupedRepos));
  });
