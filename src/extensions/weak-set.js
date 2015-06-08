if (typeof WeakSet !== 'undefined' && WeakSet !== null) {

  require('extend-object-def');


  WeakSet.extend = function(childAttrs) {
    return extendObjectDef(WeakSet, childDefAttrs);
  };

}
