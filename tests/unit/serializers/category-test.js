import { moduleForModel, test } from 'ember-qunit';

moduleForModel('category', 'Unit | Serializer | category', {
  needs: ['model:repo', 'serializer:category']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
