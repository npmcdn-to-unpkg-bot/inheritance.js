if (typeof WeakMap !== 'undefined' && WeakMap !== null) {

  require('extend-object-def');


  WeakMap.extend = function(childDefAttrs) {
    return extendObjectDef(WeakMap, childDefAttrs);
  };

}
