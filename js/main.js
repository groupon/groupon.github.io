$(function() {
  var categoriesTemplate = $("#template-categories").html(),
      categoryListTemplate = $("#template-category-list").html(),
      json = {
        categories: [
          {
            title: "Continuous Integration",
            projects: [
              {
                githubURL: "https://github.com/groupon/DotCi",
                title: "DotCi",
                summary: "Jenkins github integration",
                stars: 414
              },
              {
                githubURL: "https://github.com/groupon/DotCi-Plugins-Starter-Pack",
                title: "DotCi Plugins Starter Pack",
                summary: "Expansion-pack for DotCi",
                stars: 5
              },
            ]
          },
          {
            title: "Testing",
            projects: [
              {
                githubURL: "https://github.com/groupon/Selenium-Grid-Extras",
                title: "Selenium Grid Extras",
                summary: "SimpleSelenium Grid Nodes",
                stars: 198
              },
              {
                githubURL: "https://github.com/groupon/selenium-download",
                title: "Selenium Download",
                summary: "Allow downloading of latest selenium standalone server and chromedriver",
                stars: 4
              },
              {
                githubURL: "https://github.com/groupon/testium",
                title: "Testium",
                summary: "Integration test library for Node.js",
                stars: 276
              },
              {
                githubURL: "https://github.com/groupon/assertive",
                title: "Assertive",
                summary: "Assertive is an assertion library ideally suited for coffee-script",
                stars: 15
              },
              {
                githubURL: "https://github.com/groupon/assertive-as-promised",
                title: "Assertive as Promised",
                summary: "Extends assertive with promise support ",
                stars: 1
              },

            ]
          }
        ]
      };
  $("#categories").html(Mustache.render(categoriesTemplate, json));
  $("#left-nav-categories").html(Mustache.render(categoryListTemplate, json));
});
