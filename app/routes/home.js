import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this._preloadRepos().then(() => {
      return this.store.findAll('category');
    });
  },

  _preloadRepos() {
    return this.store.findAll('repo');
  }
});
