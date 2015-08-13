Inheritance.js [![Build Status](https://img.shields.io/travis/bsara/inheritance.js.svg)](https://travis-ci.org/bsara/inheritance.js?style=flat-square)
=================================================

[![CPOL v1.02 License](https://img.shields.io/badge/license-CPOL--1.02-blue.svg?style=flat-square)](https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)

[![NPM Package](https://img.shields.io/npm/v/inheritance-js.svg?style=flat-square)](https://www.npmjs.com/package/inheritance-js)&nbsp;
[![Bower Package](https://img.shields.io/bower/v/inheritance-js.svg?style=flat-square)](http://bower.io/search/?q=inheritance-js)

[![Gitter Chat](https://badges.gitter.im/JOIN%20CHAT.svg)](https://gitter.im/bsara/inheritance.js)


Simple, lightweight extensions and helpers that make inheritance in JS a breeze, all with pure JavaScript, no extra libraries needed.

Includes support for AMD, CommonJS, and global inclusion via an HTML script tag.

> *Special Thanks to [YouMightNotNeedjQuery.com](http://youmightnotneedjquery.com). The functions `mix`, `mixDeep`, `mixPrototype`, and `mixPrototypeDeep`
were based largly off of their implementation of ["Extend"](http://youmightnotneedjquery.com/#extend) and
["Deep Extend"](http://youmightnotneedjquery.com/#deep_extend).*



## Install

- **NPM:** `$ npm install --save inheritance-js`
- **Bower:** `$ bower install --save inheritance-js`
- [**Download**](https://github.com/bsara/inheritance.js/releases)



## Features

- Usable implementation of a `_super` prototype variable added to objects created with
  `ObjectDefinition.create()`. **NO NEED TO USE `call` OR `apply`!**
- Helper functions for extending any object or object definition.
- Helper functions for extending objects via mixins.
- Adds ability to define object definition level (I.E. "static" or non-prototype)
  attributes inline with prototype (I.E. "instance") variables; thus, increasing code
  organization
- `extend` function added to default `Object` implementation and many more built-in JS
  objects. ([Full List of Extensible Built-in Objects](https://github.com/bsara/inheritance.js/wiki/Native-JS-Object-Changes))





# Documentation

[**Changelog**](https://github.com/bsara/inheritance.js/blob/master/CHANGELOG.md)


---


### Table of Contents

- [Code Samples](#code-samples)
- [Including the Library in your project](#including-the-library-in-your-project)
    - [Include via HTML Script Tag](#include-via-html-script-tag)
    - [Include as ADM Module](#include-as-amd-module)
    - [Include as CommonJS Module](#include-as-commonjs-module)
- [Functions](#functions)
    - [ObjectDefinition.create](#objectdefinitioncreateobjdef)
    - [inheritance](#inheritanceparent-childdef)
    - [makeInheritable](#makeinheritableobj-overwrite-ignoreoverwriteerror)
    - [mix](#mixobj-mixins)\
    - [mixDeep](#mixdeepobj-mixins)
    - [mixPrototype](#mixprototypeobj-mixins)
    - [mixPrototypeDeep](#mixprototypedeepobj-mixins)
- [Functions Added to `Object`](#functions-added-to-object)
    - [Object.extend](#objectextendchilddef)
    - [Object.prototype.mix](#objectprototypemix)
    - [Object.prototype.mixDeep](#objectprototypemixdeep)


---


## Code Samples

- Create New Object Definition (I.E. "Class") [[JSbin](http://jsbin.com/wurure/edit?js,console)] [[JSFiddle](https://jsfiddle.net/bsara/ekwajv83/)]


---


## Including the Library in your project

> **Note:** If you don't want any native objects to be modified by this library, just use `inheritance.noexts.js` rather than `inheritance.js`.

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




## Functions

### [ObjectDefinition.create(objDef)](https://github.com/bsara/inheritance.js/blob/master/src/object-definition.js)

Creates a new object (I.E. "class") that can be inherited.
**NOTE:** The new object inherits the native JavaScript `Object`.

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| `objDef`  | Object | **TODO**                    |

#### Returns

- `Object` - The newly created, inheritable, object that inherits `Object`.

#### Usage

**TODO**


---


### [inheritance(parent, childDef)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/inheritance.js)

Creates a new object definition based upon the given `childDef` attributes that inherits
the given `parent`.

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| parent    | Object | The object to be inherited. |
| *childDef | Object | An object containing all attributes to be used in creating the new object definition that will inherit the given `parent` object. If this parameter is`undefined` or `null`, then a new child object definition is created. **TODO: Add reference to the childDef spec** |

#### Returns

- `Object` - An object created from the given `childDef` that inherits `parent`.

#### Usage

**TODO**


---


### [makeInheritable(obj, overwrite, ignoreOverwriteError)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/make-inheritable.js)

Makes an object inheritable by adding a function called `extend` as a "static" attribute
of the object. _(I.E. Calling this function adding passing `Object` as a parameter, creates `Object.extend`)_

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


### [mix(obj, mixins)](https://github.com/bsara/inheritance.js/blob/master/src/mixin/mix.js)

**TODO**

#### Parameters

| Name                  | Type          | Description                     |
|-----------------------|---------------|---------------------------------|
| obj                   | Object        | The object to mix into.<br/>**NOTE:** `undefined` and `null` are both VALID values for this parameter. If `obj` is `undefined` or `null`, then a new object will be created from the `mixins` given. |
| mixins                | Array<Object> | An array of objects whose attributes should be mixed into the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

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
| mixins                | Array<Object> | An array of objects whose attributes should be deep mixed into the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

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
| mixins                | Array<Object> | An array of objects whose attributes should be mixed into the prototype of the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

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
| mixins                | Array<Object> | An array of objects whose attributes should be deep mixed into the prototype of the given `obj`.<br/>**NOTE:** The order of objects in this array does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The deep mixed version of `obj`.

#### Errors thrown

- `TypeError` - If `obj.prototype` does not exist.

#### Usage

**TODO**


---


## Functions Added to `Object`

### [Object.extend(childDef)](https://github.com/bsara/inheritance.js/blob/master/src/inherit/make-inheritable.js#L46)

Creates a new object definition based upon the given `childDef` attributes and causes that new object definition to inherit this object.

**NOTE:** For a list of all native JavaScript objects that have this function added to them, see [the wiki page](https://github.com/bsara/inheritance.js/wiki/Native-JS-Object-Changes).
All of the other native JavaScript objects with this function work exactly as described here (I.E. this piece of documentation is not specific to `Object`).

#### Parameters

| Name      | Type   | Description                 |
|-----------|--------|-----------------------------|
| childDef  | Object | An object containing all attributes to be used in creating the new object definition that will inherit the `Object`. If this parameter is `undefined` or `null`, then a new child object definition is created. **TODO: Add reference to the childDef spec**  |

#### Returns

- `Object` - An object created from the given `childDef` that inherits `Object`.

#### Usage

```javascript
var ChildObject = Object.extend({
  // Child Definition Attributes
});
```


---


### [Object.prototype.mix(...)](https://github.com/bsara/inheritance.js/blob/master/src/ext/extensions.object.js#L20)

**TODO**

#### Parameters

| Name      | Type      | Description                 |
|-----------|-----------|-----------------------------|
| arguments | Object... | Mixin objects whose attributes should be mixed into the `Object`.<br/>**NOTE:** The order of objects passed as arguments does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

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


### [Object.prototype.mixDeep(...)](https://github.com/bsara/inheritance.js/blob/master/src/ext/extensions.object.js#L38)

**TODO**

#### Parameters

| Name      | Type      | Description                 |
|-----------|-----------|-----------------------------|
| arguments | Object... | Mixin objects whose attributes should be deep mixed into the `Object`.<br/>**NOTE:** The order of objects in this array does matter! If there are attributes present in multiple mixin objects, then the mixin with the largest index value overwrite any values set by the lower index valued mixin objects. |

#### Returns

- `Object` - The `Object`, deep mixed with the given mixin objects.

#### Usage

**TODO**




# Contributing

See [contribution documentation page](https://github.com/bsara/inheritance.js/blob/master/CONTRIBUTING.md) for details.
