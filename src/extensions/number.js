require('extend-object-def');


Number.extend = function(childDefAttrs) {
  return extendObjectDef(Number, childDefAttrs);
};
