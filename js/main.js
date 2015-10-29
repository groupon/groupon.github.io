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
                summary: "Extends assertive with promise support",
                stars: 1
              },
              {
                githubURL: "https://github.com/groupon/odo",
                title: "Odo",
                summary: "A Mock Proxy Server",
                stars: 105
              },
              {
                githubURL: "https://github.com/groupon/robo-remote",
                title: "Robo Remote",
                summary: "A remote control framework for Robotium",
                stars: 32
              },
              {
                githubURL: "https://github.com/groupon/retromock",
                title: "Retromock",
                summary: "Like Wiremock for Retrofit, but faster",
                stars: 13
              },
              {
                githubURL: "https://github.com/groupon/mysql-junit4",
                title: "MySQL JUnit4",
                summary: "JUnit 4 support for Tests against MySQL",
                stars: 4
              },
            ]
          },
          {
            title: "Utility",
            projects: [
              {
                githubURL: "https://github.com/groupon/webdriver-http-sync",
                title: "Webdriver HTTP Sync",
                summary: "Sync HTTP implementation of the WebDriver protocol for Node.js",
                stars: 25
              },
              {
                githubURL: "https://github.com/groupon/params_deserializers",
                title: "Params Deserializers",
                summary: "Deserializers for Rails params",
                stars: 1
              },
              {
                githubURL: "https://github.com/groupon/cson-parser",
                title: "CSON Parser",
                summary: "Simple & safe CSON parser",
                stars: 84
              },
              {
                githubURL: "https://github.com/groupon/jesos",
                title: "Jesos",
                summary: "A pure Java implementation of the Apache Mesos APIs",
                stars: 46
              },
              {
                githubURL: "https://github.com/groupon/gofer",
                title: "Gofer",
                summary: "A general purpose service client library for node.js",
                stars: 36
              },
              {
                githubURL: "https://github.com/groupon/mysql_slowlogd",
                title: "MySQL Slowlogd",
                summary: "Streaming MySQL slow query log over HTTP",
                stars: 23
              },
              {
                githubURL: "https://github.com/groupon/tdsql",
                title: "tdsql",
                summary: "Run SQL queries against a Teradata data warehouse server",
                stars: 20
              },
              {
                githubURL: "https://github.com/groupon/node-cached",
                title: "Node Cached",
                summary: "A simple caching library for node.js, inspired by the Play cache API",
                stars: 21
              },
              {
                githubURL: "https://github.com/groupon/sycl",
                title: "sycl",
                summary: "Simple YAML Config Library",
                stars: 10
              },
              {
                githubURL: "https://github.com/groupon/shellot",
                title: "Shellot",
                summary: "Slim terminal realtime graphing tool",
                stars: 8
              },
              {
                githubURL: "https://github.com/groupon/poller",
                title: "Poller",
                summary: "Poll a URL, and trigger code on changes",
                stars: 8
              },
            ]
          },
	  {
	    title: "Miscelaneous",
	    projects: [
              {
                githubURL: "https://github.com/groupon/greenscreen",
                title: "Greenscreen",
                summary: "A digital signage solution using the Web and Chromecast devices",
                stars: 863
              },
	      {
                githubURL: "https://github.com/groupon/pebble",
                title: "Pebble",
                summary: "Efficient Web Graphs",
                stars: 7
              },
              {
                githubURL: "https://github.com/groupon/gleemail",
                title: "Gleemail",
                summary: "Making email template development fun! Sort of!",
                stars: 280
              },
              {
                githubURL: "https://github.com/groupon/roll",
                title: "roll",
                summary: "roll - bootstrap or upgrade a Unix host with Roller",
                stars: 9
              },
	    ]
	  }
        ]
      };
  $("#categories").html(Mustache.render(categoriesTemplate, json));
  $("#left-nav-categories").html(Mustache.render(categoryListTemplate, json));
});
