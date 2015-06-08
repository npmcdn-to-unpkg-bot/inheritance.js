require('extend-object-def');


Function.extend = function(childDefAttrs) {
  return extendObjectDef(Function, childDefAttrs);
};
