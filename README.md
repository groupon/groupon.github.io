# groupon.github.io

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone git@github.com:groupon/groupon.github.io.git`
* `cd groupon.github.io`
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit the app at [http://localhost:4200](http://localhost:4200).

Development is done on the `develop` branch. Since this is a GitHub Pages site, `master` is reserved for serving the GitHub Pages site.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

groupon.github.io uses [ember-cli-github-pages](https://github.com/poetic/ember-cli-github-pages) for deployment to GitHub Pages. Deploy by running `ember github-pages:commit` from the `develop` branch, then pushing up master.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

