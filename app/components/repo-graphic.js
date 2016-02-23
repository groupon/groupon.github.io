import Ember from 'ember';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  classNames: ['repo-graphic'],

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
  }
});
