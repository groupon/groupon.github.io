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

### GitHub Repo Data

GitHub's API is rate-limited, so the Ember app can't simply make client-side requests to GitHub or else users would quickly hit GitHub's API's rate limit. Instead, GitHub data must be fetched at build time and stored in local static JSON files.

To generate these JSON files, you'll need a GitHub client ID and client secret, which can be acquired by (registering a developer application)[https://github.com/settings/developers]. Once you have a developer application, set `clientID` and `clientSecret` in your environment, then run `node script/generate-api.js`. This will save all JSON files needed for GitHub repo data into `public/api`. These files should then be committed to the repo.

### Repo Categories

The only repos that will be displayed on groupon.github.io (other than the three "Latest Projects" at the top) will be those repos that are explicitly listed in `public/api/categories.json`. This is the only file that is generated manually, rather than by the `script/generate-api.js` script. Edit `public/api/categories.json` to modify which repos should be displayed in groupon.github.io's repo categories. Note that the names of the repos should be exactly equal to the repo names on GitHub.com.

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

