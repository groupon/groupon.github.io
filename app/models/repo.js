import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  created_at: DS.attr('date'),
  description: DS.attr('string'),
  forks_count: DS.attr('number'),
  languagesURL: Ember.computed('name', function() { return `/api/repos/${this.get('name')}/languages.json`; }),
  html_url: DS.attr('string'),
  name: DS.attr('string'),
  stargazers_count: DS.attr('number')
});
