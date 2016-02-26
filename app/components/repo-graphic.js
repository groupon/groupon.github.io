/* global d3 */
import Ember from 'ember';

var grouponGreen = '83, 163, 24',
    shades = [1, 0.8, 0.6, 0.4, 0.2];

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  classNames: ['repo-graphic'],
  cellSize: 11,

  renderGraph: Ember.observer('bytesPerLanguage', 'languageCells', 'numberOfColumns', 'numberOfRows', function() {
    let rects = this.get('languageCells'),

        rectGrid = d3.layout
                     .grid()
                     .bands()
                     .nodeSize([this.get('cellSize'), this.get('cellSize')])
                     .cols(this.get('numberOfColumns'))
                     .rows(this.get('numberOfRows')),

        graph = d3.select(this.get('element')).append('svg'),
        wrapper = graph.append('g'),
        main = wrapper.selectAll('g').data(rectGrid(rects));

    main.enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${d.x},${d.y})`; });

    main.append('rect')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .attr('class', (d) => {
          return this._getLetterForCell(d) ? 'with-letter' : 'without-letter';
        })
        .style('fill', (d) => {
          return `rgba(${grouponGreen}, ${this._getShadeForCell(d)})`;
        });

    main.append('text')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .attr('transform', 'translate(2, 10)')
        .attr('class', (d) => {
          return this._getShadeForCell(d) > 0.45 ? 'dark-background' : 'light-background';
        })
        .text((d) => { return this._getLetterForCell(d); });
  }),

  _getShadeForCell(cell) {
    return shades[cell.languageIndexRelativeToGraph % shades.length];
  },

  _getLetterForCell(cell) {
    let label = cell.label[cell.cellIndexRelativeToLanguage];
    return label ? label.toUpperCase() : '';
  },

  numberOfColumns: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).width() / this.get('cellSize'));
  }),

  numberOfRows: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).height() / this.get('cellSize'));
  }),

  numberOfCells: Ember.computed('numberOfColumns', 'numberOfRows', function() {
    return this.get('numberOfColumns') * this.get('numberOfRows');
  }),

  languageCells: Ember.computed('bytesPerLanguage', 'totalBytes', 'numberOfCells', function() {
    var languageCells = [],
        bytesPerLanguage = this.get('bytesPerLanguage'),
        percentFormatter = d3.format(',%'),
        percentage,
        numberOfCellsForPercentage,
        languageIndex = 0;

    for (var language in bytesPerLanguage) {
      if (bytesPerLanguage.hasOwnProperty(language)) {
        percentage = bytesPerLanguage[language] / this.get('totalBytes');
        numberOfCellsForPercentage = this._numberOfCellsForPercentage(percentage);
        this.set('remainingNumberOfCells', this.get('remainingNumberOfCells') - numberOfCellsForPercentage);

        for (var i = 0; i < numberOfCellsForPercentage; i++) {
          languageCells.push({
            language: language,
            languageIndexRelativeToGraph: languageIndex,
            cellIndexRelativeToLanguage: i,
            label: `${percentFormatter(percentage)} ${language}`
          });
        }

        languageIndex++;
      }
    }

    return languageCells;
  }),

  totalBytes: Ember.computed('bytesPerLanguage', function() {
    var bytes = 0,
        bytesPerLanguage = this.get('bytesPerLanguage');

    for (var language in bytesPerLanguage) {
      if (bytesPerLanguage.hasOwnProperty(language)) {
        bytes += bytesPerLanguage[language];
      }
    }

    return bytes;
  }),

  bytesPerLanguageAsArray: Ember.computed('bytesPerLanguage', function() {
    var bytesPerLanguageAsArray = [],
        bytesPerLanguage = this.get('bytesPerLanguage');

    for (var language in bytesPerLanguage) {
      if (bytesPerLanguage.hasOwnProperty(language)) {
        bytesPerLanguageAsArray.push({
          language: language,
          bytes: bytesPerLanguage[language]
        });
      }
    }

    return bytesPerLanguageAsArray;
  }),

  byteCounts: Ember.computed.mapBy('bytesPerLanguageAsArray', 'bytes'),
  maximumBytes: Ember.computed.max('byteCounts'),
  maximumPercentage: Ember.computed('maximumBytes', 'totalBytes', function() {
    return this.get('maximumBytes') / this.get('totalBytes');
  }),

  setLanguagesInitializer: Ember.on('init', function() {
    this._setLanguages();
  }),

  setLanguagesObserver: Ember.observer('repo', function() {
    this._setLanguages();
  }),

  _setLanguages() {
    if (this.get('repo')) {
      this.get('ajax').request(this.get('repo.languagesURL')).then((languages) => {
        this.set('bytesPerLanguage', languages);
      });
    }
  },

  _numberOfCellsForPercentage(percentage) {
    var estimatedNumberOfCellsForPercentage = Math.round(percentage * this.get('numberOfCells')),
        remainingNumberOfCells = this.get('remainingNumberOfCells'),
        numberOfCellsForPercentage = Math.min(estimatedNumberOfCellsForPercentage, remainingNumberOfCells);
    return numberOfCellsForPercentage;
  },

  remainingNumberOfCells: Ember.computed('numberOfCells', function() {
    return this.get('numberOfCells');
  }),

  _cellsForLanguage(language) {
    return new Array(language.numberOfCells).fill(language);
  }
});
