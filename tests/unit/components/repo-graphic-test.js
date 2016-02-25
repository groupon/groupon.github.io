import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('repo-graphic', 'Unit | Component | repo graphic', {
  needs: ['service:ajax']
});

test('languageCells has the correct number of cells per language', function(assert) {
  let component = this.subject(),
      javaScriptCells;

  component.set('bytesPerLanguage', { JavaScript: 45, CoffeeScript: 5 });
  component.set('numberOfCells', 100);

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
