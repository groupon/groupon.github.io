import Ember from 'ember';

export function arraySlice(params) {
  var arrayToSlice = params[0],
      begin = params[1],
      end = params[2];
  return arrayToSlice.slice(begin, end);
}

export default Ember.Helper.helper(arraySlice);
