require('extend-object-def');


Intl.DateTimeFormat.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.DateTimeFormat, childDefAttrs);
};
