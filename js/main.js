var categories = [
      {
        name: "Testing",
        repos: [
          "Selenium-Grid-Extras",
          "selenium-download",
          "testium",
          "assertive",
          "assertive-as-promised",
          "odo",
          "robo-remote",
          "retromock",
          "mysql-junit4"
        ]
      },
      {
        name: "Utility",
        repos: [
          "webdriver-http-sync",
          "params_deserializers",
          "cson-parser",
          "jesos",
          "gofer",
          "mysql_slowlogd",
          "tdsql",
          "node-cached",
          "sycl",
          "shellot",
          "poller"
        ]
      },
      {
        name: "Continuous Integration",
        repos: [
          "DotCi",
          "DotCi-Plugins-Starter-Pack"
        ]
      },
      {
        name: "Miscellaneous",
        repos: [
          "greenscreen",
          "pebble",
          "gleemail",
          "roll"
        ]
      }
    ],
    populateRepos = function(repos) {
      return categories.map(function(category) {
        return {
          name: category.name,
          repos: category.repos.map(function(repoName, index) {
            return repos.find(function(repo) {
              return repo.name === repoName;
            });
          })
        }
      });
    };

$(function() {
  var categoriesTemplate = $("#template-categories").html(),
      categoryListTemplate = $("#template-category-list").html();

  $.getJSON("/json/repos.json", function(repos) {
    var populatedRepos = populateRepos(repos);
    console.log(populatedRepos);

    $("#categories").html(Mustache.render(categoriesTemplate, populatedRepos));
    $("#left-nav-categories").html(Mustache.render(categoryListTemplate, populatedRepos));
  });
});
