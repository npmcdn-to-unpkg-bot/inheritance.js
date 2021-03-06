Inheritance.js [![Build Status](https://img.shields.io/travis/bsara/inheritance.js.svg)](https://travis-ci.org/bsara/inheritance.js?style=flat-square)
=================================================

[![CPOL v1.02 License](https://img.shields.io/badge/license-CPOL--1.02-blue.svg?style=flat-square)](https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)

[![NPM Package](https://img.shields.io/npm/v/inheritance-js.svg?style=flat-square)](https://www.npmjs.com/package/inheritance-js)&nbsp;
[![Bower Package](https://img.shields.io/bower/v/inheritance-js.svg?style=flat-square)](http://bower.io/search/?q=inheritance-js)


> **WARNING: This project has been deprecated** and **will be removed from NPM and Bower in about 6 months (Feb, 2017)**! This project started out as
  an experiment/learning tool for me, but I ultimately found that the approach taken in the project is VERY inefficient. I'm truly very sorry for any
  inconvenience this may cause. I recommend as a replacement that you use the native inheritance functionality of JavaScript, it's fast, and really
  actually not that hard to pick up; or just use [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). Trying to
  turn the prototypal inheritance into classical inheritance is really not worth it in JavaScript. It's better to embrace how the language works
  naturally, once you do, you'll never regret it. I will remove the library from NPM and Bower in about 6 months.
  **If anyone would like to take over the project, just let me know.**


Simple, lightweight extensions and helpers that make inheritance in JS a breeze, all with pure JavaScript, no extra libraries needed.

Includes support for AMD, CommonJS, and global inclusion via an HTML script tag.

> *Special Thanks to [YouMightNotNeedjQuery.com](http://youmightnotneedjquery.com). The functions `mix`, `mixDeep`, `mixPrototype`, and `mixPrototypeDeep`
were based largly off of their implementation of ["Extend"](http://youmightnotneedjquery.com/#extend) and
["Deep Extend"](http://youmightnotneedjquery.com/#deep_extend).*



## Install

- **NPM:** `$ npm install --save inheritance-js`
- **Bower:** `$ bower install --save inheritance-js`
- **CDN (minified):** `<script src="//npmcdn.com/inheritance-js@0.4.12/dist/inheritance.min.js"></script>`
- **CDN (not minified):** `<script src="//npmcdn.com/inheritance-js@0.4.12"></script>`
- [**Download**](https://github.com/bsara/inheritance.js/releases)



## Features

- Built with fully native, pure JavaScript! No extra libraries needed.
- Make any object inheritable with one function call.
- Make any object non-inheritable ("sealed") with one function call.
- Easily create object definitions containing...
    - mixins (deep)
    - private properties
    - static properties
    - static constant properties
    - private static properties
    - [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) (via `get` keyword)
    - [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) (via `set` keyword)
- Object definition creation is made much more readable/maintainable.
- Mix multiple objects into one. (Almost same as jQuery/underscore/lodash `extend`).
- Optional extensions/inheritance for native JavaScript objects ([Full List of Native Object Extensions](https://github.com/bsara/inheritance.js/wiki/Native-JS-Object-Changes))
- Support for...
    - AMD
    - CommonJS
    - Global HTML script tag





# Documentation

[**Changelog**](https://github.com/bsara/inheritance.js/blob/master/CHANGELOG.md)


---


### Table of Contents

- [Code Samples](#code-samples)
- [Including the Library in your project](#including-the-library-in-your-project)
    - [Include as AMD Module](#include-as-amd-module)
    - [Include as CommonJS Module](#include-as-commonjs-module)
    - [Include via HTML Script Tag](#include-via-html-script-tag)
- [Functions](#functions)
    - [ObjectDefinition.create](#objectdefinitioncreateobjdef)
    - [ObjectDefinition.createSealed](#objectdefinitioncreatesealedobjdef)
    - [inheritance](#inheritanceparent-objdefprops)
    - [makeInheritable](#makeinheritableobj-overwrite-ignoreoverwriteerror)
    - [seal](#sealobj-overwrite-ignoreoverwriteerror)
    - [mix](#mixobj-mixins)
    - [mixDeep](#mixdeepobj-mixins)
    - [mixPrototype](#mixprototypeobj-mixins)
    - [mixPrototypeDeep](#mixprototypedeepobj-mixins)
- [Functions Added to `Object`](#functions-added-to-object) _(These additions are optional)_
    - [Object.extend](#objectextendobjdefprops)
    - [Object.prototype.mix](#objectprototypemix)
    - [Object.prototype.mixDeep](#objectprototypemixdeep)


---


## Code Samples

- Create New Object Definition (I.E. "Class") [[JSbin][cs-create-obj-def-jsbin]] [[JSFiddle][cs-create-obj-def-jsfiddle]]


---


## Including the Library in your project

> **Note:** If you don't want any native objects to be modified by this library, just use `inheritance.noexts.js` rather than `inheritance.js`.

#### Include as AMD Module

```javascript
define([ 'inheritance' ], function(I) {
  I.mix(...);

  var MyObj = I.ObjectDefinition.create(...);P

  ...
});
```


#### Include as CommonJS Module

```javascript
var I = require('inheritance');

I.mix(...);

var MyObj = I.ObjectDefinition.create(...);

...
```


#### Include via HTML Script Tag

```html
<script type="text/javascript" src="inheritance.min.js" />
<script type="text/javascript">
  I.mix(...);

  // Notice that `ObjectDefinition` belongs to the `window` object, not the `I` namespace.
  var MyObj = ObjectDefinition.create(...);

  ...
</script>
```




## Functions

### [ObjectDefinition.create(objDef)](https://github.com/bsara/inheritance.js/blob/master/src/object-definition.js#L8)

Creates a new object (I.E. "class") that can be inherited.

> **NOTE:** The new object inherits the native JavaScript `Object`.

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| `objDef`  | Object | **TODO**                    |

#### Returns

- `Object` - The newly created, inheritable, object that inherits `Object`.

#### Usage

- [JSbin][cs-create-obj-def-jsbin]
- [JSFiddle][cs-create-obj-def-jsfiddle]


---


### [ObjectDefinition.createSealed(objDef)](https://github.com/bsara/inheritance.js/blob/master/src/object-definition.js#L21)

Creates a new object (I.E. "class") that CANNOT be inherited.

> **NOTE:** The new object inherits the native JavaScript `Object`.

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| `objDef`  | Object | **TODO**                    |

#### Returns

- `Object` - The newly created, non-inheritable, object that inherits `Object`.

#### Usage

**TODO**


---


### [inheritance(parent, objDefProps)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/inheritance.js)

Creates a new object definition based upon the given `objDefProps` that inherits the
given `parent`.

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| parent    | Object | The object to be inherited. |
| *objDefProps | Object | An object containing all properties to be used in creating the new object definition that will inherit the given `parent` object. If this parameter is`undefined` or `null`, then a new child object definition is created. **TODO: Add reference to the objDefProps spec** |

#### Returns

- `Object` - An object created from the given `objDefProps` that inherits `parent`.

#### Usage

**TODO**


---


### [makeInheritable(obj, overwrite, ignoreOverwriteError)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/make-inheritable.js)

Makes an object inheritable by adding a function called `extend` as a "static" property
of the object. _(I.E. Calling this function passing `MyObject` as a parameter, creates
`MyObject.extend`)_

#### Parameters

| Name                  | Type    | Description                     |
|-----------------------|---------|---------------------------------|
| obj                   | Object  | The object to make inheritable. |
| *overwrite            | Boolean | If `true`, then an existing `extend` property will be overwritten regardless of it's value. |
| *ignoreOverwriteError | Boolean | If `true`, then no error will be thrown if `obj.extend` already exists and `overwrite` is not `true`. |

#### Returns

- `Object` - The modified `obj` given.

#### Errors thrown

- `TypeError` - If `obj` is `undefined` or `null`.
- `TypeError` - If `obj.extend` already exists and `overwrite` is NOT equal `true`.

#### Usage

**TODO**


---


### [seal(obj, overwrite, ignoreOverwriteError)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/seal.js)

Makes an object sealed by adding a function called `extend` as a "static" property
of the object that throws an error if it is ever called. Also adds a readonly
"static" property named `sealed` to the object definition that is set to `true`,
thus allowing for one to quickly determine whether or not an object's definition
is sealed without catching the error thrown by it's `extend` function.
_(I.E. Calling this function passing `MyObject` as a parameter, creates
`MyObject.extend` and `MyObject.sealed`, where `MyObject.sealed` will always be
`true`)_

#### Parameters

| Name                  | Type    | Description         |
|-----------------------|---------|---------------------|
| obj                   | Object  | The object to seal. |
| *overwrite            | Boolean | If `true`, then an existing `extend` property will be overwritten regardless of it's value. |
| *ignoreOverwriteError | Boolean | If `true`, then no error will be thrown if `obj.extend` already exists and `overwrite` is not `true`. |

#### Returns

- `Object` - The modified `obj` given.

#### Errors thrown

- `TypeError` - If `obj` is `undefined` or `null`.
- `TypeError` - If `obj.extend` already exists and `overwrite` is NOT equal `true`.

#### Usage

**TODO**


---


### [mix(obj, mixins)](https://github.com/bsara/inheritance.js/blob/master/src/mixin/mix.js)

**TODO**

#### Parameters

| Name                  | Type          | Description                     |
|-----------------------|---------------|---------------------------------|
| obj                   | Object        | The object to mix into.<br/>**NOTE:** `undefined` and `null` are both VALID values for this parameter. If `obj` is `undefined` or `null`, then a new object will be created from the `mixins` given. |
| mixins                | Array<Object> | An array of objects whose properties should be mixed into the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The mixed version of `obj`.

#### Usage

**TODO**


---


### [mixDeep(obj, mixins)](https://github.com/bsara/inheritance.js/blob/master/src/mixin/mix-deep.js)

**TODO**

#### Parameters

| Name                  | Type          | Description                     |
|-----------------------|---------------|---------------------------------|
| obj                   | Object        | The object to deep mix into.<br/>**NOTE:** `undefined` and `null` are both VALID values for this parameter. If `obj` is `undefined` or `null`, then a new object will be created from the `mixins` given. |
| mixins                | Array<Object> | An array of objects whose properties should be deep mixed into the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The deep mixed version of `obj`.

#### Usage

**TODO**


---


### [mixPrototype(obj, mixins)](https://github.com/bsara/inheritance.js/blob/master/src/mixin/mix-prototype.js)

**TODO**

#### Parameters

| Name                  | Type          | Description                     |
|-----------------------|---------------|---------------------------------|
| obj                   | Object        | The object containing the prototype to mix into.<br/>**NOTE:** `undefined` and `null` are both VALID values for this parameter. If `obj` is `undefined` or `null`, then a new object will be created from the `mixins` given. |
| mixins                | Array<Object> | An array of objects whose properties should be mixed into the prototype of the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The mixed version of `obj`.

#### Errors thrown

- `TypeError` - If `obj.prototype` does not exist.

#### Usage

**TODO**


---


### [mixPrototypeDeep(obj, mixins)](https://github.com/bsara/inheritance.js/blob/master/src/mixin/mix-prototype-deep.js)

**TODO**

#### Parameters

| Name                  | Type          | Description                     |
|-----------------------|---------------|---------------------------------|
| obj                   | Object        | The object containing the prototype to deep mix into.<br/>**NOTE:** `undefined` and `null` are both VALID values for this parameter. If `obj` is `undefined` or `null`, then a new object will be created from the `mixins` given. |
| mixins                | Array<Object> | An array of objects whose properties should be deep mixed into the prototype of the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The deep mixed version of `obj`.

#### Errors thrown

- `TypeError` - If `obj.prototype` does not exist.

#### Usage

**TODO**


---


## Functions Added to `Object`

### [Object.extend(objDefProps)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/make-inheritable.js#L46)

Creates a new object definition based upon the given `objDefProps` and causes that new object definition to inherit this object.

> **NOTE:** For a list of all native JavaScript objects that have this function added to them, see [the wiki page](https://github.com/bsara/inheritance.js/wiki/Native-JS-Object-Changes).
All of the other native JavaScript objects with this function work exactly as described here (I.E. this piece of documentation is not specific to `Object`).

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| objDefProps  | Object | An object containing all properties to be used in creating the new object definition that will inherit the `Object`. If this parameter is `undefined` or `null`, then a new child object definition is created. **TODO: Add reference to the objDefProps spec**  |

#### Returns

- `Object` - An object created from the given `objDefProps` that inherits `Object`.

#### Usage

```javascript
var ChildObject = Object.extend({
  // Child Definition Properties
});
```


---


### [Object.prototype.mix(...)](https://github.com/bsara/inheritance.js/blob/master/src/extensions.js#L4)

**TODO**

#### Parameters

| Name      | Type      | Description                 |
|-----------|-----------|-----------------------------|
| arguments | Object... | Mixin objects whose properties should be mixed into the `Object`.<br/>**NOTE:** The order of objects passed as arguments does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The `Object`, mixed with the given mixin objects.

#### Usage

```javascript
var obj = new Object();

obj.value0 = 42;
obj.value1 = "Fish fingers and custard";
obj.value2 = {
  value0: 20,
  value1: 21
}
obj.func0 = function() {
  console.log('func0');
};
obj.func1 = function() {
  console.log('func1');
};

var mixin0 = {
  mixin0Var0: 0,
  mixin0Var1: 0.1,
  mixin0Func0: function() {
    console.log('mixin0Func0');
  },
  mixin0Func1: function() {
    console.log('mixin0Func1');
  },

  value2: {
    value0: "Blah"
  }
};

var mixin1 = {
  mixin1Var0: 1,
  mixin1Var1: 1.1,

  value0: 24,
  func0: function() {
    console.log('func0 overridden by mixin1');
  },

  mixin0Func: function() {
    console.log('mixin0Func overridden by mixin1');
  }
};

var mixin2 = {
  mixin2Var: 2,
  mixin2Func: function() {
    console.log('mixin2Func');
  },

  value0: 4400,
  func0: function() {
    console.log('func0 overridden by mixin2');
  },

  mixin0Var1: 2.1,
  mixin0Func0: function() {
    console.log('mixin0Func0 overridden by mixin2');
  },

  mixin1Var0: 2.2
};

// At this point, `obj` can be represented as follows:
//    {
//      value0: 42,
//      value1: "Fish fingers and custard"
//      func0: function() {...},
//      func1: function() {...}
//    }

var newObj = obj.mix(mixin0, mixin1, mixin2);

console.log('newObj.value0 = ' + newObj.value0); // newObj.value0 = 4400
console.log('newObj.value1 = ' + newObj.value1); // newObj.value1 = "Fish fingers and custard"
console.log('newObj.value2.value0 = ' + newObj.value2.value0) // newObj.value2.value0 = "Blah"
console.log('newObj.value2.value1 = ' + newObj.value2.value1) // newObj.value2.value1 = undefined

console.log('newObj.mixin0Var0 = ' + newObj.mixin0Var0); // newObj.mixin0Var0 = 0
console.log('newObj.mixin0Var1 = ' + newObj.mixin0Var1); // newObj.mixin0Var1 = 2.1

console.log('newObj.mixin1Var0 = ' + newObj.mixin1Var0); // newObj.mixin1Var0 = 1
console.log('newObj.mixin1Var1 = ' + newObj.mixin1Var1); // newObj.mixin1Var1 = 2.1

console.log('newObj.mixin2Var = ' + newObj.mixin2Var); // newObj.mixin2Var = 2

newObj.func0() // Prints "func0 overridden by mixin2"
newObj.func1() // Prints "func1"

newObj.mixin0Func0() // Prints "mixin0Func0 overridden by mixin2"
newObj.mixin0Func1() // Prints "mixin0Func1 overridden by mixin1"

newObj.mixin2Func() // Prints "mixin2Func"
```


---


### [Object.prototype.mixDeep(...)](https://github.com/bsara/inheritance.js/blob/master/src/extensions.js#L25)

**TODO**

#### Parameters

| Name      | Type      | Description                 |
|-----------|-----------|-----------------------------|
| arguments | Object... | Mixin objects whose properties should be deep mixed into the `Object`.<br/>**NOTE:** The order of objects in this array does matter! If there are properties present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The `Object`, deep mixed with the given mixin objects.

#### Usage

**TODO**




# Contributing

See [contribution documentation page](https://github.com/bsara/inheritance.js/blob/master/CONTRIBUTING.md) for details.




[cs-create-obj-def-jsbin]: http://jsbin.com/wurure/edit?js,console "Create Object Definition Code Sample (JSBin)"
[cs-create-obj-def-jsfiddle]: https://jsfiddle.net/bsara/ekwajv83/ "Create Object Definition Code Sample (JSFiddle)"
