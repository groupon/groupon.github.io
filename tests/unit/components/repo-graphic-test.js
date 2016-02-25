import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('repo-graphic', 'Unit | Component | repo graphic', {
  needs: ['service:ajax']
});

test('bytesPerLanguageAsArray is the bytesPerLanguage object as an array', function(assert) {
  let component = this.subject();

  var expected = [
    { language: "JavaScript", bytes: 50 },
    { language: "CoffeeScript", bytes: 2 },
  ];

  component.set('bytesPerLanguage', { "JavaScript": 50, "CoffeeScript": 2 });
  assert.deepEqual(component.get('bytesPerLanguageAsArray'), expected);
});

test('totalBytes is the sum of all byte counts', function(assert) {
  let component = this.subject();
  component.set('bytesPerLanguage', { "JavaScript": 50, "CoffeeScript": 2 });

  assert.equal(component.get('totalBytes'), 52);
});
