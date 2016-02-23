$(function() {
  var categoriesTemplate = $("#template-categories").html(),
      categoryListTemplate = $("#template-category-list").html();

  $.getJSON("/json/repos.json", function(repos) {
    $("#categories").html(Mustache.render(categoriesTemplate, repos));
    $("#left-nav-categories").html(Mustache.render(categoryListTemplate, repos));
  });
});
