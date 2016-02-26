(function() {
  var DEBUG = false;

  d3.layout.grid = function() {
    var mode = "equal",
        layout = _distributeEqually,
        x = d3.scale.ordinal(),
        y = d3.scale.ordinal(),
        size = [1, 1],
        actualSize = [0, 0],
        nodeSize = false,
        bands = false,
        padding = [0, 0],
        cols, rows;

    function grid(nodes) {
      return layout(nodes);
    }

    function _distributeEqually(nodes) {
      var i = -1,
          n = nodes.length,
          _cols = cols ? cols : 0,
          _rows = rows ? rows : 0,
          col, row;

      // FIXME: make explicit rows/cols exclusive? Or find a smart way to deal with overflows (repeat?)
      // FIXME: when rows are set, fill top-to-bottom (make test with 5 data points and 4 rows)

      if (_rows && !_cols) {
        _cols = Math.ceil(n / _rows)
      } else {
        _cols || (_cols = Math.ceil(Math.sqrt(n)));
        _rows || (_rows = Math.ceil(n / _cols));
      }

      if (nodeSize) {
        x.domain(d3.range(_rows)).range(d3.range(0, (size[0] + padding[0]) * _rows, size[0] + padding[0]));
        y.domain(d3.range(_cols)).range(d3.range(0, (size[1] + padding[1]) * _cols, size[1] + padding[1]));
        actualSize[0] = bands ? x(_rows - 1) + size[0] : x(_rows - 1);
        actualSize[1] = bands ? y(_cols - 1) + size[1] : y(_cols - 1);
      } else if (bands) {
        x.domain(d3.range(_rows)).rangeBands([0, size[0]], padding[0], 0);
        y.domain(d3.range(_cols)).rangeBands([0, size[1]], padding[1], 0);
        actualSize[0] = x.rangeBand();
        actualSize[1] = y.rangeBand();
      } else {
        x.domain(d3.range(_rows)).rangePoints([0, size[0]]);
        y.domain(d3.range(_cols)).rangePoints([0, size[1]]);
        actualSize[0] = x(1);
        actualSize[1] = y(1);
      }

      if (DEBUG) console.log('cols/rows', _cols, _rows);

      while (++i < n) {
        col = i % _cols;
        row = Math.floor(i / _cols);

        if (DEBUG) console.log(i, col, row);

        nodes[i].x = x(row);
        nodes[i].y = y(col);
      }

      return nodes;
    }

    // grid.mode = function(value) {
    //   if (!arguments.length) return mode;
    //   switch(mode = value) {
    //     case "equal":
    //       layout = _distributeEqually;
    //       break;
    //   }
    //   return grid;
    // }

    grid.size = function(value) {
      if (!arguments.length) return nodeSize ? actualSize : size;
      actualSize = [0, 0];
      nodeSize = (size = value) == null;
      return grid;
    }

    grid.nodeSize = function(value) {
      if (!arguments.length) return nodeSize ? size : actualSize;
      actualSize = [0, 0];
      nodeSize = (size = value) != null;
      return grid;
    }

    grid.rows = function(value) {
      if (!arguments.length) return rows;
      rows = value;
      return grid;
    }

    grid.cols = function(value) {
      if (!arguments.length) return cols;
      cols = value;
      return grid;
    }

    grid.bands = function() {
      bands = true;
      return grid;
    }

    grid.points = function() {
      bands = false;
      return grid;
    }

    grid.padding = function(value) {
      if (!arguments.length) return padding;
      padding = value;
      return grid;
    }

    return grid;
  };
})();

import colors from 'groupon-git-hub/data/colors';
/* global d3 */
import Ember from 'ember';

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
                     .cols(this.get('numberOfRows'))
                     .rows(this.get('numberOfColumns')),

        graph = d3.select(this.get('element')).append('svg'),
        wrapper = graph.append('g'),
        main = wrapper.selectAll('g').data(rectGrid(rects));

    main.enter()
        .append('g')
        .attr('transform', function(d) { return `translate(${d.x},${d.y})`; });

    main.append('rect')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .style('fill', function(d) { return d.color; });

    main.append('text')
        .attr('width', rectGrid.nodeSize()[0])
        .attr('height', rectGrid.nodeSize()[1])
        .attr('transform', 'translate(2, 10)')
        .text((d) => { return this._getLetterForCell(d); });
  }),

  _getLetterForCell(cell) {
    return cell.label[cell.index] ? cell.label[cell.index] : '';
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
        numberOfCellsForPercentage;

    for (var language in bytesPerLanguage) {
      if (bytesPerLanguage.hasOwnProperty(language)) {
        percentage = bytesPerLanguage[language] / this.get('totalBytes');
        numberOfCellsForPercentage = this._numberOfCellsForPercentage(percentage);
        this.set('remainingNumberOfCells', this.get('remainingNumberOfCells') - numberOfCellsForPercentage);

        for (var i = 0; i < numberOfCellsForPercentage; i++) {
          languageCells.push({
            language: language,
            color: colors[language] || '#222',
            index: i,
            percentage: percentage,
            label: `${percentFormatter(percentage)} ${language}`
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
