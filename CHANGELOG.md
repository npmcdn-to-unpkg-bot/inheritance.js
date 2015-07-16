## [v0.2.0](https://github.com/bsara/inheritance.js/tree/v0.2.0) () **[Breaking Release]**

*__WARNING:__ This release will break nearly all code made against previous releases*

* **[Function Renamed]** `extendObjectDef` -> `inheritance`
* **[Function Renamed]** `deepMix` -> `mixDeep`
* **[Function Renamed]** `mixWithObjectDef` -> `mixPrototype`
* **[Function Renamed]** `Object.prototype.deepMix` -> `Object.prototype.mixDeep`
* **[New Function]** `makeInheritable`
* **[New Function]** `mixPrototypeDeep`
* **[Changed Dist Files]** `dist/modules` now contains all separated modules instead of having them all at the root
* **[New Dist File]** `dist/inheritance.noext.js` - This file is the same as `dist/inheritance.js` except that it does not contain any of the extended native objects (except for `Object`, it is still extended).
* Converted files to UMD format to support AMD, CommonJS, and global includes
* Added inline documentation
* Added useful documentation to README


## [v0.1.3](https://github.com/bsara/inheritance.js/tree/v0.1.3) (2015-07-09)

* **[Bug Fix]** `Symbol` tries to add `extend` function even when `Symbol` doesn't exist.
* Added Travis CI integration.
* Added documentation generation gulp task for future use.
* Added gulp `help` task.
* Cleaned up `gulpfile.js`.
* Fixed issues found by JSHint and fully implemented JSHint throughout project.
* Fixed `.gitattributes` issues (for reals this time).


## [v0.1.2](https://github.com/bsara/inheritance.js/tree/v0.1.2) (2015-06-17)

* **[Breaking Change]** `src` directory removed from `dist` directory. All files are
now contained within the same directory.
* Updated output files to allow for more appropriate inclusion into cdnjs.com.
* Updated `.gitattributes` to ensure that all files will have Unix style line endings.


## [v0.1.1](https://github.com/bsara/inheritance.js/tree/v0.1.1) (2015-06-16)

* **[Bug Fix]** `deepMix` throws exception because of variable name typo.
* **[Bug Fix]** Couldn't use mixins with object definition creation.
* **[Breaking Change]** Dist file names now all begin with `inheritance.`.
* Updated Required version of Gulp.


## [v0.0.2](https://github.com/bsara/inheritance.js/tree/v0.0.2) (2015-06-08)

* Initial Release
