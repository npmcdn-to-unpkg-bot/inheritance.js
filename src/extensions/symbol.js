if (typeof Promise !== 'undefined' && Promise !== null) {

  require('extend-object-def');


  Symbol.extend = function(childDefAttrs) {
    return extendObjectDef(Symbol, childDefAttrs);
  };

}