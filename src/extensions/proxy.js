if (typeof Proxy !== 'undefined' && Proxy !== null) {

  require('extend-object-def');


  Proxy.extend = function(childDefAttrs) {
    return extendObjectDef(Proxy, childDefAttrs);
  };

}
