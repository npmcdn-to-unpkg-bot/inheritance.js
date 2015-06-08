if (typeof Set !== 'undefined' && Set !== null) {

  require('extend-object-def');


  Set.extend = function(childDefAttrs) {
    return extendObjectDef(Set, childDefAttrs);
  };

}
