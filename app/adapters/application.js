import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api',
  pathForType(modelName) {
    var decamelized = Ember.String.decamelize(modelName);
    return `${Ember.String.pluralize(decamelized)}.json`;
  }
});
