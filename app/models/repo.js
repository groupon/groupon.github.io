import DS from 'ember-data';

export default DS.Model.extend({
  created_at: DS.attr('date'),
  description: DS.attr('string'),
  forks_count: DS.attr('number'),
  html_url: DS.attr('string'),
  name: DS.attr('string'),
  stargazers_count: DS.attr('number')
});
