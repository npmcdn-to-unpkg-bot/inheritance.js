if (typeof Reflect !== 'undefined' && Reflect !== null) {

  require('extend-object-def');


  Reflect.extend = function(childDefAttrs) {
    return extendObjectDef(Reflect, childDefAttrs);
  };

}
