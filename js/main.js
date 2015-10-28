$(function() {
  var template = $("#template-project-categories").html(),
      json = {
        categories: [
          {
            title: "Continuous Integration",
            projects: [
              {
                githubURL: "githubURL",
                title: "Project name",
                summary: "Project summary is a little longer than the title",
                stars: 123
              },
              {
                githubURL: "githubURL",
                title: "Project name",
                summary: "Project summary is a little longer than the title",
                stars: 123
              },
              {
                githubURL: "githubURL",
                title: "Project name",
                summary: "Project summary is a little longer than the title",
                stars: 123
              },
              {
                githubURL: "githubURL",
                title: "Project name",
                summary: "Project summary is a little longer than the title",
                stars: 123
              },
              {
                githubURL: "githubURL",
                title: "Project name",
                summary: "Project summary is a little longer than the title",
                stars: 123
              }
            ]
          }
        ]
      };
  $("#projects").html(Mustache.render(template, json));
});
