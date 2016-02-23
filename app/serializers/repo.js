import ApplicationSerializer from 'groupon-git-hub/serializers/application';

export default ApplicationSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var wrapped = { repos: payload };
    return this._super(store, primaryModelClass, wrapped, id, requestType);
  }
});
