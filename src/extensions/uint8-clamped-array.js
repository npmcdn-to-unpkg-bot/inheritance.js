require('extend-object-def');


Uint8ClampedArray.extend = function(childDefAttrs) {
  return extendObjectDef(Uint8ClampedArray, childDefAttrs);
};
