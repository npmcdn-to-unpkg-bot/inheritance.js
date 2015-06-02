Objects.js
===================================

[![Licensed under the CPOL v1.02](https://img.shields.io/badge/license-CPOL--1.02-blue.svg?style=flat)](https://github.com/bsara/objects.js/blob/master/LICENSE.md)


A simple &amp; small implementation of object inheritance in JavaScript.


## Install

**TODO**

<!--
- **NPM:** `$ npm install --save object-js`
- **Bower:** `$ bower install --save object-js`
- [Download Latest](#)
-->



## Features

- Usable implementation of a `_super` prototype variable added to objects created with
  `ObjectDefinition.create()`. **NO NEED TO USE `call` OR `apply`!**
- Helper functions for extending any object or object definition.
- Helper functions for extending objects via mixins.
- Adds ability to define object definition level (I.E. "static" or non-prototype)
  attributes inline with prototype (I.E. "instance") variables; thus, increasing code
  organization
- `extend` function added to default `Object` implementation and many more built-in JS
  objects. ([Full List of Extensible Built-in Objects](#))



## Usage

### [Full Documentation](https://github.com/bsara/objects.js/wiki/Objects.js-Wiki-Home)


### Create New Object Definition (I.E. "Class")

**View on [JSBin](http://jsbin.com/wurure/edit?js,console) or [JSFiddle](http://jsfiddle.net/bsara/ekwajv83/)**

```javascript
var MyNewObject = ObjectDefinition.create({

  mixins: [
    MyMixin0,
    MyMixin1,
    MyMixin2
  ],


  static: { // These attributes will NOT be inherited by any child object definitions.
    staticAttr0: 42,
    staticAttr1: 4242,

    staticFunc0: function(param0) {
      alert("MyNewObject.staticFunc0 hit!");
    }
  },


  protoAttr0: null,
  protoAttr1: "Fish fingers and custard",
  protoAttr2: {
    attr0: 17,
    attr1: null
  },
  protoAttr3: [ 'val0', 'val1', 'val2' ],



  // This function is NOT required, but it acts as the constructor for object
  // creation if is present.
  ctor: function(id) {
    console.log("MyNewObject.ctor hit!''");
    this.protoAttr0 = id;
  },



  func0: function() {
    console.log("MyNewObject.func0 hit!");
  },


  func1: function(toPrint) {
    console.log(toPrint);
  }
});
```


### Create Child Object Definition

*Using the class given in the example above*

```javascript
// Notice that the extend function exists for `MyNewObject` even though it was
// not specifically created by us!
var MyChildObject = MyNewObject.extend({

  static: {
    staticAttr0: 24
  },


  childProtoAttr0: 42,
  childProtoAttr1: "sudo make me a sandwich",
  childProtoAttr2: null,


  ctor: function(id, name) {
    this.super(id)
  }
});
```

***TODO: Finish adding examples!***


## Contributing

See [contribution documentation page](https://github.com/bsara/objects.js/blob/master/CONTRIBUTING.md) for details.
