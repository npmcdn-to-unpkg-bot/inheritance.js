import { extendObjectDef } from '../extend-object-def';



Symbol.extend = function(childDefAttrs) {
  return extendObjectDef(Symbol, childDefAttrs);
};
