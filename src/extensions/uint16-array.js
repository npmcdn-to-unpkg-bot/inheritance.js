import { extendObjectDef } from '../extend-object-def';



Uint16Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint16Array, childDefAttrs);
};
