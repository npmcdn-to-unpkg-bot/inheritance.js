require('extend-object-def');


RegExp.extend = function(childDefAttrs) {
  return extendObjectDef(RegExp, childDefAttrs);
};
