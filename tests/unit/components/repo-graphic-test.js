import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('repo-graphic', 'Unit | Component | repo graphic', {
  needs: ['service:ajax']
});

test('languageCells has the correct number of cells per language', function(assert) {
  let component = this.subject(),
      javaScriptCells;

  component.set('numberOfCells', 100);
  component.set('bytesPerLanguage', { JavaScript: 45, CoffeeScript: 5 });

  javaScriptCells = component.get('languageCells').filter(function(cell) {
    return cell.language === 'JavaScript';
  });
  assert.equal(javaScriptCells.length, 90);
});

test('totalBytes is the sum of all byte counts', function(assert) {
  let component = this.subject();
  component.set('bytesPerLanguage', { JavaScript: 50, CoffeeScript: 2 });

  assert.equal(component.get('totalBytes'), 52);
});

test('_getLetterForCell() gets the correct letter for a given cell', function(assert) {
  let component = this.subject(),
      cell = { label: '5% CSS' };

  cell.cellIndexRelativeToLanguage = 0;
  assert.equal(component._getLetterForCell(cell), '5');

  cell.cellIndexRelativeToLanguage = 3;
  assert.equal(component._getLetterForCell(cell), 'C');
});

test('_getLetterForCell() returns an empty string if there are no characters left', function(assert) {
  let component = this.subject(),
      cell = { label: '5% CSS' };

  cell.cellIndexRelativeToLanguage = 10;
  assert.equal(component._getLetterForCell(cell), '');
});

test('bytesPerLanguageAsArray is the bytesPerLanguage object as an array', function(assert) {
  let component = this.subject();

  var expected = [
    { language: "JavaScript", bytes: 50 },
    { language: "CoffeeScript", bytes: 2 },
  ];

  component.set('bytesPerLanguage', { JavaScript: 50, CoffeeScript: 2 });

  assert.deepEqual(component.get('bytesPerLanguageAsArray'), expected);
});
