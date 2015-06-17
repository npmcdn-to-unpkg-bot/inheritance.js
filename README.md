Inheritance.js
=================================================

[![CPOL v1.02 License](https://img.shields.io/badge/license-CPOL--1.02-blue.svg?style=flat-square)](https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)

[![NPM Package](https://img.shields.io/npm/v/inheritance-js.svg?style=flat-square)](https://www.npmjs.com/package/inheritance-js)&nbsp;
[![Bower Package](https://img.shields.io/bower/v/inheritance-js.svg?style=flat-square)](http://bower.io/search/?q=inheritance-js)

[![Gitter Chat](https://badges.gitter.im/JOIN%20CHAT.svg)](https://gitter.im/bsara/inheritance.js)


A simple and small implementation of object inheritance using pure JavaScript.



## Install

- **NPM:** `$ npm install --save inheritance-js`
- **Bower:** `$ bower install --save inheritance-js`
- **Download:**
    - [v0.1.2](https://github.com/bsara/inheritance.js/releases/tag/v0.1.2) *(Latest)*
    - [v0.1.1](https://github.com/bsara/inheritance.js/releases/tag/v0.1.1)
    - [v0.0.2](https://github.com/bsara/inheritance.js/releases/tag/v0.0.2)



## Features

- Usable implementation of a `_super` prototype variable added to objects created with
  `ObjectDefinition.create()`. **NO NEED TO USE `call` OR `apply`!**
- Helper functions for extending any object or object definition.
- Helper functions for extending objects via mixins.
- Adds ability to define object definition level (I.E. "static" or non-prototype)
  attributes inline with prototype (I.E. "instance") variables; thus, increasing code
  organization
- `extend` function added to default `Object` implementation and many more built-in JS
  objects. ([Full List of Extensible Built-in Objects](https://github.com/bsara/inheritance.js/wiki/Built-in-Object-Changes))



## Documentation

- [Wiki](https://github.com/bsara/inheritance.js/wiki)
- [Changelog](https://github.com/bsara/inheritance.js/blob/master/CHANGELOG.md)



## Usage

- Create New Object Definition (I.E. "Class") [[JSbin](http://jsbin.com/wurure/edit?js,console)] [[JSFiddle](https://jsfiddle.net/bsara/ekwajv83/)]

## Contributing

See [contribution documentation page](https://github.com/bsara/inheritance.js/blob/master/CONTRIBUTING.md) for details.
