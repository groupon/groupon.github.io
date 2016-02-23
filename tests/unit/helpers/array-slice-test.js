import { arraySlice } from 'groupon-git-hub/helpers/array-slice';
import { module, test } from 'qunit';

module('Unit | Helper | array slice');

test('it slices an array', function(assert) {
  let result = arraySlice([[1, 2, 3], 1, 2]);
  assert.deepEqual(result, [2]);
});
