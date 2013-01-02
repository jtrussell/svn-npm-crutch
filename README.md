# svn-npm-crutch

Allow node modules to be installed from svn repos

###WARNING###
Installing this module **will** make changes to your project's package.json
file.

## Getting Started (not yet on npm)
Add a reference to this repo in your project's package.json file

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
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 iVantage Health Analytics
Licensed under the MIT license.
