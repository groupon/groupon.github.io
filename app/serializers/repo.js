import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'name',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var wrapped = { repos: payload };
    return this._super(store, primaryModelClass, wrapped, id, requestType);
  }
});
