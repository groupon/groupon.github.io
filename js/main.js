$(function() {
  var categoriesTemplate = $("#template-categories").html(),
      categoryListTemplate = $("#template-category-list").html();

  $.getJSON('/github.json', {}, function(response) {
    $("#categories").html(Mustache.render(categoriesTemplate, response));
    $("#left-nav-categories").html(Mustache.render(categoryListTemplate, response));
  });
});
