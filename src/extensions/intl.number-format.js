require('extend-object-def');


Intl.NumberFormat.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.NumberFormat, childDefAttrs);
};
