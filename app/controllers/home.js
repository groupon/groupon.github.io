import Ember from 'ember';

export default Ember.Controller.extend({
  repos: Ember.computed(function() {
    return this.store.findAll('repo');
  }),
  reposSorting: ['created_at:desc'],
  reposSortedByCreatedAt: Ember.computed.sort('repos', 'reposSorting'),
});
