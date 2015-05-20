# svn-npm-crutch

> Allow node modules to be installed from svn repos.

As the name implies this project is essentially a crutch allowing you to
install modules with npm when they are living in a svn repo. It does not aim
to carry all of npm's features forward for svn housed modules, just provide a
mechanism to get them into your project with an `npm install`. IF you have other
features you would like to see... pull requests are appreciated :).

### WARNING

Installing this module **will** make changes to your project's package.json
file.

Installing this module via `npm install` will add an install hook to your
project's package.json. Once this hook is added any time your run `npm install`
for your project svn-npm-crutch looks through your package.json file for an
`svnDependencies` block where you can list your subversion stored node modules.

## Getting Started
Install with `npm install --save svn-npm-crutch`

```javascript
"dependencies": {
  "svn-npm-crutch": "^0.5.4"
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
When uninstalling this module make sure the install hook has been removed. This
should happend automatically when you `npm uninstall svn-npm-crutch` and only be
necessary if you manually uninstall the module by deleting the files and removing
entries from your package.json.

## Examples
Run a test with `grunt test` then take a look at `./test/tmp`

## Testing
Why `grunt test` instead of `npm test`? Running `npm test` initializes some
environment variables. We could go through and clean that up during the testing
process... but it's easier to just test with grunt directly.

## TODO

* More tests.
* Be less invasive? Right now this rewrites your entire package.json after
	adding it's install hook using JSON.stringify... This isn't horrible but
	clobbers white space and formatting.
* Don't perform an `svn update` if a specific repo tag/revision number is
	specified... maybe clean out the old module and do a fresh checkout?
* Better detection of when the module is being installed as a dependency vs
	being itself installed (i.e. running `npm install` on the project itself)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code
using [grunt](http://gruntjs.com/).

## Release History
* 0.5.3
 * Added a `svn cleanup` phase after the `svn checkout` and `svn update` phases
 * Using `cp.exec` to run `npm install` rather than `cp.spawn`... seems to be an
	 issue on Windows
* 0.5.0
 * Share stdio with childprocesses, allow for svn prompts to be addresses
 * More efficient testing... us npm programmatically to install this mod in a
	 test dir
* 0.4.1
 * Make sure updates to svn modules are fetched
* 0.4.0
 * Refactored install routine
 * More descriptive status reporting
 * Performs `svn update` after attempting to install (get module changes)
* 0.3.0
 * Tests added

## License
Copyright (c) 2012 iVantage Health Analytics
Licensed under the MIT license.
