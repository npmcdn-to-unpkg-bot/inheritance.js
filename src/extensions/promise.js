if (typeof Promise !== 'undefined' && Promise !== null) {

  require('extend-object-def');


  Promise.extend = function(childDefAttrs) {
    return extendObjectDef(Promise, childDefAttrs);
  };

}
