## [v0.4.3](https://github.com/bsara/inheritance.js/tree/v0.4.3) (2015-09-04)

* **[New Feature]** Plain objects (JSON formatted objects that don't contain a prototype) are now deep mixed when extending, rather than a full replacement of the parent's object.
* Major code cleanup in `src/inherit/inheritance.js`.


## [v0.4.2](https://github.com/bsara/inheritance.js/tree/v0.4.2) (2015-08-26)

* **[Bug Fix]** `Object.mix` and `Object.mixDeep` weren't passing mixins to `mix` and `mixDeep` as an array.


## [v0.4.1](https://github.com/bsara/inheritance.js/tree/v0.4.1) (2015-08-26)

* **[Bug Fix]** Fixed reference to `mixDeep` in `inheritance.mixprototypedeep.js`.
* **[Bug Fix]** Fixed return statements in `inheritance.mixprototype.js` and `inheritance.mixprototypedeep.js`.


## [v0.4.0](https://github.com/bsara/inheritance.js/tree/v0.4.0) (2015-08-25) **[Breaking Changes]**

> __WARNING:__ This release will break previous versions where `super` and `_super` is used to call parent functions

* **[New Feature]** "Private" properties and "private" static properties (private is in quotes because the properties are not really private, however, they are not [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Enumerable_attribute) when added to the object's definition).
* **[New Feature]** Static constant properties.
* **[New Function]** `seal`
* **[New Function]** `ObjectDefinition.createSealed`
* **[Bug Fix]** Fixed infinite recursive function calls when using `super` and `_super` functions. Now, calling `this._super` will call the super version of the function where `this._super` is called. (I really tried to get around this so that super functions can be called from any function in an object definition...but the solution was quite terrible. I'm always open to help if anyone is willing to offer it!)
* **[Bug Fix]** Minified versions of library "modules" restored.
* Minor code cleanup.


## [v0.3.2](https://github.com/bsara/inheritance.js/tree/v0.3.2) (2015-08-12)

* **[Breaking Change]** Removed need to have `Object` modified to use `ObjectDefinition.create`. This means that `inheritance.noexts.js` no longer contains extensions to `Object`, which was the only native object extended in that file.
* **[Bug Fix]** Made extension functions non-enumerable for native objects and when calling `makeInheritable`.


## [v0.2.4](https://github.com/bsara/inheritance.js/tree/v0.2.3) (2015-08-11)

* **[Bug Fix]** Making native object inheritable fails because it wasn't specified that any existing `extend` function should be overwritten.
* **[Feature]** Added ability to pass a single mixin OR and array of mixins to `mix`, `mixDeep`, `mixPrototype`, and `mixPrototypeDeep`.
* Updated UMD implementation so that when library is included globally (I.E. not as a module), the default namespace of the library is `I`. (However, `ObjectDefinition` is not namespaced, it is added as a property of the root object).
* Documentation updates.


## [v0.2.0](https://github.com/bsara/inheritance.js/tree/v0.2.0) (2015-07-16) **[Breaking Changes]**

> __WARNING:__ This release will break nearly all code using previous releases

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
