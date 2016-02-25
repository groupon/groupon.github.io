/* global d3 */
import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  classNames: ['repo-graphic'],
  estimatedCellSize: 11,
  cellSize: Ember.computed('element', 'numberOfColumns', function() {
    return Ember.$(this.get('element')).width() / this.get('numberOfColumns');
  }),

  renderGraph: Ember.observer('bytesPerLanguage',
                              'languageCells',
                              'numberOfColumns',
                              'numberOfRows', function() {
    var rects = this.get('languageCells'),

        rectGrid = d3.layout
                     .grid()
                     .bands()
                     .nodeSize([this.get('cellSize'), this.get('cellSize')])
                     .cols(this.get('numberOfColumns'))
                     .rows(this.get('numberOfRows')),

        wrapper = d3.select(this.get('element'))
                    .append('svg')
                    .append('g'),

        main = wrapper.selectAll('g').data(rectGrid(rects));

    main.enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${d.x},${d.y})`; });

    main.append('rect')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .style('fill', function(d) { return `rgba(83, 163, 24, ${d.relativePercentage * 0.75 + 0.25})`; });

    main.append('text')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .attr('transform', 'translate(0, 11)')
        .text((d) => { return this._getLetterForCell(d); });
  }),

  _getLetterForCell(cell) {
    return cell.language[cell.index % cell.language.length].toUpperCase();
  },

  numberOfColumns: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).width() / this.get('estimatedCellSize'));
  }),

  numberOfRows: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).height() / this.get('estimatedCellSize'));
  }),

  numberOfCells: Ember.computed('numberOfColumns', 'numberOfRows', function() {
    return this.get('numberOfColumns') * this.get('numberOfRows');
  }),

  languageCells: Ember.computed('bytesPerLanguage',
                                'totalBytes',
                                'numberOfCells',
                                'maximumPercentage', function() {
    var languageCells = [],
        bytesPerLanguage = this.get('bytesPerLanguage'),
        percentage,
        numberOfCellsForPercentage;

    for (var language in bytesPerLanguage) {
      if (bytesPerLanguage.hasOwnProperty(language)) {
        percentage = bytesPerLanguage[language] / this.get('totalBytes');
        numberOfCellsForPercentage = this._numberOfCellsForPercentage(percentage);

        for (var i = 0; i < numberOfCellsForPercentage; i++) {
          languageCells.push({
            language: language,
            index: i,
            relativePercentage: percentage / this.get('maximumPercentage')
          });
        }
      }
    }

    return languageCells;
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
    return Math.round(percentage * this.get('numberOfCells'));
  },

  _cellsForLanguage(language) {
    return new Array(language.numberOfCells).fill(language);
  }
});
