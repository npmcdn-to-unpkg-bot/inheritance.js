
module.exports.mix = mix;
module.exports.deepMix = deepMix;
module.exports.mixWithObjectDef = mixWithObjectDef;



function mix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 1; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}


function deepMix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 1; i < mixins.length; i++) {
    var mixin = mixin[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        if (typeof mixin[attrName] === 'object') {
          deepMix(newObj[attrName], mixin[attrName]);
          continue;
        }
        newObj[attrName] = mixin[attrName];
      }
    }
  }

  return newObj;
}


function mixWithObjectDef(objDef, mixins) {
  objDef = (objDef || {});

  var objDefPrototype = objDef.prototype;

  for (var i = 1; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (mixin.hasOwnProperty(attrName)) {
        objDefPrototype[attrName] = mixin[attrName];
      }
    }
  }

  return objDef;
}
