if (typeof Map !== 'undefined' && Map !== null) {

  require('extend-object-def');


  Map.extend = function(childDefAttrs) {
    return extendObjectDef(Map, childDefAttrs);
  };

}
