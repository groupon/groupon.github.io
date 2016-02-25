import colors from 'groupon-git-hub/data/colors';
/* global d3 */
import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  classNames: ['repo-graphic'],
  estimatedCellSize: 11,
  cellSize: Ember.computed('element', 'numberOfColumns', function() {
    return Ember.$(this.get('element')).width() / this.get('numberOfColumns');
  }),

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
        main = wrapper.selectAll('g').data(rectGrid(rects)),
        percentFormatter = d3.format(',%'),

        tip = d3.tip()
                .offset([-10, 0])
                .attr('class', 'd3-tip')
                .html(function(d) {
                  return `
                    <div class="repo-graphic-tooltip"
                         style="background:${d.color};color:${d.color}">
                      <span class="repo-graphic-tooltip-text">
                        ${percentFormatter(d.percentage)} ${d.language}
                      </span>
                    </div>
                  `;
                });

    graph.call(tip);

    main.enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${d.x},${d.y})`; })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    main.append('rect')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .style('fill', function(d) { return d.color; });
  }),

  numberOfColumns: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).width() / this.get('estimatedCellSize'));
  }),

  numberOfRows: Ember.computed('element', 'cellSize', function() {
    return Math.round(Ember.$(this.get('element')).height() / this.get('estimatedCellSize'));
  }),

  numberOfCells: Ember.computed('numberOfColumns', 'numberOfRows', function() {
    return this.get('numberOfColumns') * this.get('numberOfRows');
  }),

  languageCells: Ember.computed('bytesPerLanguage', 'totalBytes', 'numberOfCells', function() {
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
            color: colors[language] || '#ededed',
            percentage: percentage
          });
        }
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
