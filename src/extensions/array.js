import { extendObjectDef } from '../extend-object-def';



Array.extend = function(childDefAttrs) {
  return extendObjectDef(Array, childDefAttrs);
};
