# svn-npm-crutch

Allow node modules to be installed from svn repos

###WARNING###
Installing this module **will** make changes to your project's package.json
file.

Installing this module via `npm install` will add an install hook to your
project's package.json. Once this hook is added anytime your run `npm install`
for your project svn-npm-crutch looks through your package.json file for an
`svnDependencies` block where you can list your subversion stored node modules.

## Getting Started
Install with `npm install svn-npm-crutch`

```javascript
"dependencies": {
	"svn-npm-crutch": "git://github.com/jrussell-ivantage/svn-npm-crutch.git"
}
```

After installing svn-npm-crutch you may use list dependencies from subversion
repositories in your `package.json` under a "svnDependencies" key. e.g.

```javascript
"svnDependencies": {
	"svn-module": "svn://path/to/svn/repo/trunk"
}
```

## Documentation
_(Coming soon)_

## Examples

Run a test `npm test` then take a look at `./test/tmp`

## TODO

* Tests... yep
* Be less invasive? Right now this rewrites your entire package.json after
	adding it's install hook using JSON.stringify... This isn't horrible but
	clobbers things like white space.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## Release History
0.3.0 - Tests added

## License
Copyright (c) 2012 iVantage Health Analytics
Licensed under the MIT license.
