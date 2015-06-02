import { extendObjectDef } from '../extend-object-def';



Uint8Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint8Array, childDefAttrs);
};
